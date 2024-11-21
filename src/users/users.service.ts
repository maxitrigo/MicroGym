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
    const decoded = this.jwtService.decode(token);
    const date = new Date();
    const formatedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    
    const user = await this.usersRepository.findOneById(decoded.id);
    
    // Asegurarse de que trainingDates exista
    if (!user.trainingDates) {
      user.trainingDates = [];
      await this.usersRepository.update(decoded.id, { trainingDates: user.trainingDates });
    }
  
    // Eliminar cualquier valor null o indefinido de trainingDates
    user.trainingDates = user.trainingDates.filter(date => date != null);
  
    // Comprobar si la fecha ya está en el array
    if (!user.trainingDates.includes(formatedDate)) {
      user.trainingDates.push(formatedDate);
      await this.usersRepository.update(decoded.id, { trainingDates: user.trainingDates });
    }
  
    return { message: 'Training date logged successfully' };
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
}
