import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { SuscriptionsService } from 'src/suscriptions/suscriptions.service';
import { SuscriptionsModule } from 'src/suscriptions/suscriptions.module';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => SuscriptionsModule), JwtModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
