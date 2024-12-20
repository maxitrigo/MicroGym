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
  
  @Post('/extend-subscription')
  @UseGuards(AdminGuard)
  async extendSubscription(
    @Headers('authorization') authHeader: string,
  ) {
    const gymToken = authHeader.split(' ')[1];
    return this.gymsService.extendMembership(gymToken);
  }
  
  @Post('checkOwnership')
  @UseGuards(AdminGuard)
  checkOwnership(@Body('gymToken') gymToken: string,@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.gymsService.checkOwnership(token, gymToken);
  }

  @Get(':slug')
  @UseGuards(AuthGuard)
  findOne(@Param('slug') slug: string, @Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.gymsService.findBySlug(slug, token);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.gymsService.findAll();
  }

  @Get(':gymToken/metrics')
  @UseGuards(AdminGuard)
  gymMetrics( @Headers('authorization') authHeader: string, @Param('gymToken') gymToken: string) {
    const token = authHeader.split(' ')[1];
    return this.gymsService.gymMetrics(token, gymToken);
  }

  @Get(':gymToken/users')
  @UseGuards(AdminGuard)
  findUsersByGymId(@Param('gymToken') gymToken: string, @Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.gymsService.findUsersByGymId(gymToken, token);
  }

  @Patch(':gymToken')
  @UseGuards(AdminGuard)
  update(@Param('gymToken') gymToken: string, @Body() updateGymDto: UpdateGymDto) {
    return this.gymsService.update(gymToken, updateGymDto);
  }


  @Delete(':gymToken')
  @UseGuards(AdminGuard)
  remove(@Param('gymToken') gymToken: string, @Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.gymsService.remove(gymToken, token);
  }
}
