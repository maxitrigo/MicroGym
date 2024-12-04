import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { SuscriptionsService } from 'src/suscriptions/suscriptions.service';


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
  
  

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateSubscription(token: string) {
    const decoded = this.jwtService.decode(token);
    
    const user = await this.usersRepository.findOneById(decoded.clientId)
    
    const subscription = await this.subscriptionsService.findOne(decoded.productId);
    console.log(subscription);
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
    const decodedGym = this.jwtService.decode(gymToken)
    const gymId = decodedGym.id

    if (userId) {
      const user = await this.usersRepository.findOneById(userId)
      if ( gymId === user.gymId ) {
        const newGym = null
        const id = user.id
        const removeGym = await this.usersRepository.update(id, 
          {
          gymId: newGym,
          freePass: false,
          admissions: 0,
          subscriptionEnd: null
         })
        return removeGym
      }
    }
    const decodedUser = this.jwtService.decode(token)
    const user = await this.usersRepository.findOneById(decodedUser.id)
    if ( gymId === user.gymId ) {
      const newGym = ''
      const removeGym = await this.update(decodedUser.id, { gymId: newGym })
      return removeGym
    }

  }
}
