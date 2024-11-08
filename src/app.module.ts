import { Module } from '@nestjs/common';
import { WorkoutsModule } from './workouts/workouts.module';
import { GymsModule } from './gyms/gyms.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/env.config';

@Module({
  imports: [
    WorkoutsModule, 
    GymsModule, 
    DatabaseModule,
    JwtModule.register({
      global: true, 
      secret: JWT_SECRET, 
      signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}