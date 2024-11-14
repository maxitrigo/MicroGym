import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Head } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';


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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
