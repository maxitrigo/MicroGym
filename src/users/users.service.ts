import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { SuscriptionsService } from 'src/suscriptions/suscriptions.service';
import axios from 'axios';


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => SuscriptionsService))
    private readonly subscriptionsService: SuscriptionsService
  ) {}

  async create(gymToken: string, token: string) {
    const decodedUser = this.jwtService.decode(token);
    const decodedGym = this.jwtService.decode(gymToken);
    console.log(decodedGym);
    
    
    const user = await this.usersRepository.create(decodedUser.id, decodedUser.name, decodedGym.id);
    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(token: string) {
    const decoded = this.jwtService.decode(token);
    const user = await this.usersRepository.findOneById(decoded.id);
    return user
  }

  async update(token: string, updateUserDto: UpdateUserDto) {
    const decoded = this.jwtService.decode(token);
    return this.usersRepository.update(decoded.id, updateUserDto);
  }

  async logTrain(token: string) {
    const decoded = this.jwtService.decode(token) as { id: string };
  
    if (!decoded || !decoded.id) {
      throw new Error("Token inválido o decodificado incorrectamente.");
    }
  
    const date = new Date();
    const formatedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  
    const user = await this.usersRepository.findOneById(decoded.id);
  
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }
  
    // Asegurarse de que trainingDates sea un array válido
    user.trainingDates = user.trainingDates?.filter(date => date != null) || [];
  
    // Si la fecha ya está registrada, no hacemos nada
    if (user.trainingDates.includes(formatedDate)) {
      return user;
    }
  
    // Si la fecha no está registrada y freePass es true, registramos el entrenamiento
    if (user.freePass) {
      try {
        user.trainingDates.push(formatedDate);
  
        // Actualizar trainingDates sin afectar las admisiones
        await this.usersRepository.update(decoded.id, {
          trainingDates: user.trainingDates,
        });
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw new Error("No se pudo registrar el entrenamiento.");
      }
      return user;
    }
  
    // Si la fecha no está registrada y freePass es false, comprobar si admissions es mayor que 0
    if (user.admissions <= 0) {
      throw new Error("No tienes más admisiones disponibles.");
    }
  
    try {
      // Actualizar trainingDates y admissions en una única operación
      user.trainingDates.push(formatedDate);
      user.admissions -= 1;
  
      await this.usersRepository.update(decoded.id, {
        trainingDates: user.trainingDates,
        admissions: user.admissions,
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw new Error("No se pudo registrar el entrenamiento.");
    }
  
    return user;
  }

  async updateSubscription(token: string) {
    const decoded = this.jwtService.decode(token);
    
    const user = await this.usersRepository.findOneById(decoded.clientId)
    
    const subscription = await this.subscriptionsService.findOne(decoded.productId);

    const today = new Date()
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + subscription.duration)
    

    
    if (subscription && subscription.freePass) {
      const updatedUser = await this.usersRepository.update(user.id, { freePass: subscription.freePass, subscriptionEnd: futureDate });
    } else {
      const updatedUser = await this.usersRepository.update(user.id, { admissions: subscription.admissions, subscriptionEnd: futureDate });
    }
  }
  async manualSubcriptionUpdate(userId: string, UpdateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(userId, UpdateUserDto);
  }

  async deleteUserGym (token, userId, gymToken) {
    const decodedUser = this.jwtService.decode(token)
    const decodedGym = this.jwtService.decode(gymToken)
    const gymId = decodedGym.id

    if (userId === '') {
      const user = await this.usersRepository.findOneById(decodedUser.id)
      if ( gymId === user.gymId ) {
        const newGym = null
        const id = user.id
        const removeGym = await this.usersRepository.update(id, 
          {
          gymId: newGym,
          freePass: false,
          admissions: 0,
          subscriptionEnd: null,
          unlink: false
         })
        return removeGym
      }
    }
    const user = await this.usersRepository.findOneById(userId)
    if ( gymId === user.gymId ) {
        const newGym = null
        const id = user.id
        const removeGym = await this.usersRepository.update(id, 
          {
          gymId: newGym,
          freePass: false,
          admissions: 0,
          subscriptionEnd: null,
          unlink: true
         })
        return removeGym
    }
  }

  async checkLogin(token: string, gymToken: string) {
    const decodedGym = this.jwtService.decode(gymToken);
    const decodedUser = this.jwtService.decode(token);

    // Comprobar si el decodedUser tiene un id válido
    if (!decodedUser || !decodedUser.id) {
      throw new Error("Usuario no válido o token inválido.");
    }
    
    // Buscar el usuario en la base de datos
    const user = await this.usersRepository.findOneById(decodedUser.id);

    
    // Si el usuario no se encuentra en la base de datos
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    // Si el slug del gimnasio es "default", asignar el gimnasio al usuario, y cambiar el estado de desvinculado
    if(decodedGym.slug === 'default') {
      await this.usersRepository.update(user.id, { gymId: decodedGym.id, unlink: false });
      return true
    }
  
    // Verificar si el usuario ya tiene un gimnasio asignado
    if (user.gymId === null && user.unlink === false) {
      // Asignar el gimnasio al usuario si no tiene uno
      await this.usersRepository.update(user.id, { gymId: decodedGym.id });
      return true;
    } else if (user.gymId === null && user.unlink === true) {
      return { slug : 'default' }
    }
  
    // Si el usuario ya tiene un gimnasio, verificar si coincide con el gimnasio recibido
    if (decodedGym.id === user.gymId) {
      return true;
    }
  
    // Si no coincide, puedes retornar un mensaje o realizar alguna otra acción
    throw new Error("El gimnasio no coincide con el asignado al usuario.");
  }
  

  async unlinkUsersFromGym(gymId: string) {
    // Actualizar todos los usuarios que tienen el gimnasio asignado
    await this.usersRepository.updateMany({ gymId }, { gymId: null, freePass: false, admissions: 0, subscriptionEnd: null });
    return { message: `Users successfully unlinked from gym with ID ${gymId}` };
  }

  async deleteUser(token: string) {
    try {
      const decoded = this.jwtService.decode(token);
      const user = await this.usersRepository.findOneById(decoded.id);
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Eliminar el usuario de la base de datos
      await this.usersRepository.delete(user.id);
  
      // Realizar la solicitud para eliminar la autenticación del usuario
      await axios.delete('http://18.231.148.87:3001/auth/delete', {
        headers: { Authorization: `Bearer ${token}` },
        data: { email: decoded.email },
      });
  
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
  

  
}
