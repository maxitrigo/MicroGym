import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards, Query } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('communications')
export class CommunicationsController {
  constructor(
    private readonly communicationsService: CommunicationsService,
    private readonly jwtService: JwtService
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() {title, message}, @Body() slug, @Headers('authorization') headers: string ) {
    const token = headers.split(' ')[1];
    return this.communicationsService.create(title, message, token, slug.slug);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOneById(@Param('id') id: string, @Headers('authorization') headers: string ) {
    return this.communicationsService.findByGymId(id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param ('id') id: string, @Query('gymId') gymId: string, @Headers('authorization') headers: string ) {
    const token = headers.split(' ')[1];
    return this.communicationsService.remove(id, gymId, token);
  }
}
