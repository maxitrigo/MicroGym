import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body, @Headers('authorization') authHeader: string ) {
    const token = authHeader.split(' ')[1];
    const gymToken = body.gymToken;
    return this.usersService.create(gymToken, token);
  }

  @Post('update-subscription')
  @UseGuards(AdminGuard)
  updateSubscription(@Headers('authorization') authHeader: string ) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    return this.usersService.updateSubscription(token);
  }

  @Post('manual-update-subscription')
  @UseGuards(AdminGuard)
  manualUpdateSubscription(@Headers('authorization') authHeader: string, @Body() Body) {
    const userId = Body.userId;
    const UpdateUserDto = {
      admissions: Body.admissions,
      freePass: Body.freePass,
      subscriptionEnd: Body.subscriptionEnd
    };
    return this.usersService.manualSubcriptionUpdate(userId, UpdateUserDto);
  }

  @Post('checkLogin')
  @UseGuards(AuthGuard)
  checkLogin(@Body('gymToken') gymToken: string,@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.usersService.checkLogin(token, gymToken)
  }

  @Get('user')
  @UseGuards(AuthGuard)
  findOne(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.usersService.findOneById(token);
  }

  @Post('log-training')
  @UseGuards(AuthGuard)
  logTrain(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.usersService.logTrain(token);
  }

  @Patch('patch')
  @UseGuards(AuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.usersService.update(token, updateUserDto);
  }

  @Patch('deleteUserGym')
  @UseGuards(AuthGuard)
  deleteUserGym(@Body('gymToken') gymToken: string, @Body('userId') userId: string, @Headers('authorization') authHeader: string){
    const token = authHeader.split(' ')[1]
    return this.usersService.deleteUserGym(token, userId, gymToken)
  }

  @Delete('deleteUser')
  @UseGuards(AuthGuard)
  deleteUser(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.usersService.deleteUser(token);
  }
}
