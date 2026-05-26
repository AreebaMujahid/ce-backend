import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // connects DB when Nest app starts
    await this.$connect();
    await this.$queryRaw`SELECT 1`;
    console.log('DB OK');
    console.log('✅ Database connected');
  }

  async onModuleDestroy() {
    // clean shutdown (important in production)
    await this.$disconnect();
    console.log('❌ Database disconnected');
  }
}
