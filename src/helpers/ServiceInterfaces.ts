import { Gym } from "src/gyms/entities/gym.entity";
import { Suscription } from "../suscriptions/entities/suscription.entity";
import { User } from "src/users/entities/user.entity";

export interface IGymsService {
    findById(gymId: string): Promise<Gym>;
  }
  
  export interface ISubscriptionsService {
    findOne(productId: string): Promise<Suscription>;
  }
  
  export interface IUsersService {
    create(newGymId: string, token: string): Promise<User>;
    findOne(userId: string): Promise<User>;
  }
  