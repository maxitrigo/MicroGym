import { Module } from '@nestjs/common';
import { WorkoutsModule } from './workouts/workouts.module';
import { GymsModule } from './gyms/gyms.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/env.config';
import { UsersModule } from './users/users.module';
import { CommunicationsModule } from './communications/communications.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';

@Module({
  imports: [
    WorkoutsModule, 
    GymsModule, 
    DatabaseModule,
    JwtModule.register({
      global: true, 
      secret: JWT_SECRET, 
      signOptions: { expiresIn: '4h' } }),
    UsersModule,
    CommunicationsModule,
    SuscriptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}