import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  createUser(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  getFlights() {
    return this.prisma.flight.findMany();
  }

  getBookings() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        flight: true,
      },
    });
  }

  createBooking(data: { userId: number; flightId: number; seat: string }) {
    return this.prisma.booking.create({
      data: {
        userId: data.userId,
        flightId: data.flightId,
        seat: data.seat,
        status: 'CONFIRMED',
      },
      include: {
        user: true,
        flight: true,
      },
    });
  }

  getPopularFlights() {
    return this.prisma.flight.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
    });
  }

  submitSupportRequest(data: { email: string; subject: string; message: string }) {
    return {
      status: 'received',
      receivedAt: new Date().toISOString(),
      request: data,
    };
  }

  async seedDemoData() {
    const flightsCount = await this.prisma.flight.count();
    if (flightsCount === 0) {
      await this.prisma.flight.createMany({
        data: [
          {
            code: 'MD042',
            route: 'TNR → CDG',
            depTime: '08:30',
            arrTime: '21:50',
            price: 830000,
            seats: 280,
            aircraft: 'Boeing 787',
          },
          {
            code: 'AF844',
            route: 'CDG → TNR',
            depTime: '22:15',
            arrTime: '14:30+1',
            price: 820000,
            seats: 350,
            aircraft: 'Airbus A350',
          },
          {
            code: 'TK072',
            route: 'IST → TNR',
            depTime: '14:00',
            arrTime: '02:40+1',
            price: 930000,
            seats: 300,
            aircraft: 'Boeing 777',
          },
        ],
      });
    }

    const usersCount = await this.prisma.user.count();
    if (usersCount === 0) {
      await this.prisma.user.create({
        data: {
          name: 'Marie Rakoto',
          email: 'marie.rakoto@email.mg',
          password: 'changeme123',
        },
      });
    }
  }
}
