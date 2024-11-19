import { Controller, Get, Post, Body, Param, Delete, Headers, UseGuards, Query } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { AdminGuard } from 'src/guards/admin.guard';


@Controller('subscriptions')
export class SuscriptionsController {
  constructor(private readonly suscriptionsService: SuscriptionsService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() Body,@Headers('authorization') authHeader: string ) {    
    return this.suscriptionsService.create(Body);
  }

  @Get()
  findAll() {
    return this.suscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suscriptionsService.findByGymId(id);
  }


  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string, @Query('gymToken') gymToken: string, @Headers('authorization') headers: string ) {
    const token = headers.split(' ')[1];
    return this.suscriptionsService.remove(id, gymToken, token);
  }
}
