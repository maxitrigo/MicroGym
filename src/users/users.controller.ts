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
    const gymId = body.gymId;
    return this.usersService.create(gymId, token);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  findOne(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.usersService.findOneById(token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
