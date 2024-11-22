import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id);
  }
}
