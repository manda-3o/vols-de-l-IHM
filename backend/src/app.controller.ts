import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return this.appService.getHealth();
  }

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.appService.getUser(Number(id));
  }

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Get('flights')
  getFlights() {
    return this.appService.getFlights();
  }

  @Get('flights/popular')
  getPopularFlights() {
    return this.appService.getPopularFlights();
  }

  @Get('bookings')
  getBookings() {
    return this.appService.getBookings();
  }

  @Post('bookings')
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.appService.createBooking(createBookingDto);
  }

  @Post('support')
  submitSupportRequest(@Body() createSupportRequestDto: CreateSupportRequestDto) {
    return this.appService.submitSupportRequest(createSupportRequestDto);
  }
}
