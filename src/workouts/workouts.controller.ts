import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post('gymWorkout')
  create(@Body() userData ) {
    return this.workoutsService.createGymWorkout(userData);
  }

  @Post('functionalWorkout')
  createFunctionalWorkout(@Body() userData ) {
    console.log(userData);
    
    return this.workoutsService.createFunctionalWorkout(userData);
  }

  @Post('crossfitWorkout')
  createCrossfitWorkout(@Body() userData ) {
    return this.workoutsService.createCrossfitWorkout(userData);
  }

  @Post('bodyweightWorkout')
  createBodyweightWorkout(@Body() userData ) {
    return this.workoutsService.createBodyweightWorkout(userData);
  }

  @Post('saveGymWorkout')
  saveWorkout(@Body() workout, @Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    console.log(workout);
    return this.workoutsService.saveWorkout(workout, token);
  }

  @Get()
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get('userWorkouts')
  findOne(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.workoutsService.findOne(token);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(id);
  }
}
