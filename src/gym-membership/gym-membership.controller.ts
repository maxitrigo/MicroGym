import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Headers } from '@nestjs/common';
import { GymMembershipService } from './gym-membership.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('gym-membership')
export class GymMembershipController {
  constructor(private readonly gymMembershipService: GymMembershipService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() Body,@Headers('authorization') authHeader: string ) {    
    return this.gymMembershipService.create(Body);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.gymMembershipService.findAll();
  }


  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string, @Query('gymToken') gymToken: string, @Headers('authorization') headers: string ) {
    const token = headers.split(' ')[1];
    return this.gymMembershipService.remove(id, gymToken, token);
  }
}
