import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'The gym has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth()
  create(@Body() createGymDto: CreateGymDto, @Headers('authorization') authHeader: string ) {
    const token = authHeader.split(' ')[1];
    return this.gymsService.create(token, createGymDto);
  }

  @Get()
  findAll(@Headers('authorization') authHeader: string) {
    return this.gymsService.findAll();
  }

  @Get(':slug')
  @UseGuards(AuthGuard)
  findOne(@Param('slug') slug: string) {
    return this.gymsService.findBySlug(slug);
  }

  @Get(':gymToken/users')
  @UseGuards(AdminGuard)
  findUsersByGymId(@Param('gymToken') gymToken: string, @Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.gymsService.findUsersByGymId(gymToken, token);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateGymDto: UpdateGymDto) {
    return this.gymsService.update(id, updateGymDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string, @Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.gymsService.remove(id, token);
  }
}
