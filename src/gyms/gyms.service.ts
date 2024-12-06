import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { GymsRepository } from './gyms.repository';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/Roles/roles.enum';
import { JWT_SECRET } from 'src/config/env.config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GymsService {
  constructor(
    private readonly gymsRepository: GymsRepository,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async create(token: string, createGymDto: CreateGymDto) {
    try{
      const decodedUser = this.jwtService.decode(token);
      const owner = decodedUser.id
      const slug = await this.gymsRepository.findBySlug(createGymDto.slug);

      if (slug) {
        throw new BadRequestException('Slug already exists');
      }

      await this.gymsRepository.create(owner, createGymDto);

      const patchRole = this.jwtService.sign({
        role: Roles.Admin
      }, {secret: JWT_SECRET})
      const response = await axios.patch('http://localhost:3001/auth/role', 
        {
          email: decodedUser.email,
          role: Roles.Admin
        },
        {
          headers: { 'Authorization': `Bearer ${patchRole}` }
        }
      );

      const newToken = response.data
      const newGym = await this.gymsRepository.findBySlug(createGymDto.slug);
      
      return { gym: newGym, token: newToken.newToken };

    } catch (error) {
      console.log(error);
      
    }
  }

  async findAll() {
    try{
      return this.gymsRepository.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string) {
    try{
      return await this.gymsRepository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async findBySlug(slug: string) {
    try{
      const gym = await this.gymsRepository.findBySlug(slug);
      const gymToken = this.jwtService.sign({
        id: gym.id,
        mercadopago: gym.mercadoPago,
      }, {secret: JWT_SECRET})
      return { 
        name: gym.name,
        email: gym.email,
        address: gym.address,
        phone: gym.phone,
        slug: gym.slug,
        image: gym.image,
        openHours: gym.openHours,
        closeHours: gym.closeHours,
        description: gym.description,
        owner: gym.owner, 
        gymToken: gymToken 
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findUsersByGymId(gymToken: string, token: string) {
    const decodedUser = this.jwtService.decode(token);
    const owner = decodedUser.id
    const decodedGym = this.jwtService.decode(gymToken);
    const gymOwner = await this.gymsRepository.findById(decodedGym.id);
    if (gymOwner.owner !== owner) {
      throw new BadRequestException('You are not the owner of this gym');
    }
    try{
      const gym = await this.gymsRepository.findUsersByGymId(decodedGym.id);
      return gym ? gym.users : [];
    } catch (error) {
      console.log(error);
    }
  }

  async update(gymToken: string, updateGymDto: UpdateGymDto) {
    try{
      const decodedGym = this.jwtService.decode(gymToken);
      const id = decodedGym.gymId
      const gym = await this.gymsRepository.findById(id);
      if (!gym) {
        throw new BadRequestException('Gym not found');
      }
      return this.gymsRepository.update(gym.id, updateGymDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(gymToken: string, token: string) {
    try{
      const decodedGym = this.jwtService.decode(gymToken);
      const id = decodedGym.id
      const decoded = this.jwtService.decode(token);
      const gym = await this.gymsRepository.findById(id);
      if (decoded.id !== gym.owner) {
        throw new BadRequestException('You are not the owner of this gym');
      }
      // Desvincular a los usuarios del gimnasio antes de eliminarlo
      await this.usersService.unlinkUsersFromGym(id);
      await this.gymsRepository.remove(id);
      await axios.delete('http://localhost:3001/auth/delete', {
        headers: { Authorization: `Bearer ${token}` },
        data: { email: decoded.email } // Aquí va el cuerpo de la solicitud
      });
      return { message: 'Gym deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  async gymMetrics(token: string, gymToken: string) {
      // Decodificar el token del gimnasio
      const decodedGym = this.jwtService.decode(gymToken);
      const decodedUser = this.jwtService.decode(token)
      const gym = await this.gymsRepository.findById(decodedGym.id);
      
      if (gym.owner !== decodedUser.id) {
        throw new UnauthorizedException('usuario no autorizado')
      }

      // Obtener transacciones del gimnasio
      const transactionsResponse = await axios.get(`http://localhost:3000/transactions/${gymToken}`, {
          headers: { 'Authorization': `Bearer ${token}` },
      });

      const transactions = transactionsResponse.data;

      // Obtener usuarios del gimnasio
      const gymData = await this.gymsRepository.findUsersByGymId(gym.id);
      const activeUsers = gymData.users.filter(user => user.status === 'active');

      // **Miembros Activos**
      const activeMembersCount = activeUsers.length;

      // **Retención de Clientes (usuarios que han entrenado en los últimos 30 días)**
      const retainedUsers = activeUsers.filter(user => {
          if (user.trainingDates && user.trainingDates.length > 0) {
              const lastTrainingDate = new Date(user.trainingDates[user.trainingDates.length - 1]);
              const daysAgo = (new Date().getTime() - lastTrainingDate.getTime()) / (1000 * 3600 * 24);
              return daysAgo <= 30; // Últimos 30 días
          }
          return false;
      });
      const retentionRate = (retainedUsers.length / activeMembersCount) * 100;

      // **Tasa de Abandono (usuarios activos que no han entrenado en los últimos 30 días)**
      const churnedUsers = activeUsers.filter(user => {
          if (user.trainingDates && user.trainingDates.length > 0) {
              const lastTrainingDate = new Date(user.trainingDates[user.trainingDates.length - 1]);
              const daysAgo = (new Date().getTime() - lastTrainingDate.getTime()) / (1000 * 3600 * 24);
              return daysAgo > 30; // No han entrenado en los últimos 30 días
          }
          return true; // Si no tiene fechas de entrenamiento, lo consideramos abandonado
      });
      const churnRate = (churnedUsers.length / activeMembersCount) * 100;

      // **Ingresos Mensuales Recurrentes (MRR)**
      // Agrupar transacciones por año
      const currentYear = new Date().getFullYear();
      const yearTransactions = transactions.filter(transaction => new Date(transaction.date).getFullYear() === currentYear);
      
      // Obtener el mes de la primera transacción
      const firstTransactionDate = new Date(yearTransactions[0]?.date);
      const monthsSinceFirstTransaction = Math.ceil((new Date().getTime() - firstTransactionDate.getTime()) / (1000 * 3600 * 24 * 30)); // Dividir entre meses

      // Ingresos mensuales recurrentes
      const totalIncome = yearTransactions.reduce((sum, transaction) => sum + Number(transaction.netAmount), 0);
      const mrr = totalIncome / monthsSinceFirstTransaction;

      // **Ingresos por Cliente**
      const incomePerUser = totalIncome / activeMembersCount;

      // Retornar las métricas
      return {
          activeMembersCount,
          retentionRate,
          churnRate,
          mrr,
          totalIncome,
          incomePerUser
      };
  }

  async checkOwnership ( token: string, gymToken: string) {
    console.log('token',token);
    console.log('gymToken',gymToken);
    
    const decodedGym = this.jwtService.decode(gymToken)
    const decodedUser = this.jwtService.decode(token)
    const gym = await this.gymsRepository.findById(decodedGym.id)
    if(gym.owner !== decodedUser.id || gymToken === null) {
      console.log('no autorizado');
      throw new UnauthorizedException ('Usted no esta habilitado para ingresar en este gym')
    }
    return true
  }

}
