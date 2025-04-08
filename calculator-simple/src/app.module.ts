import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorController } from './calculator/calculator.controller';
import { todo } from 'node:test';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CalculatorController],
  providers: [AppService],
})
export class AppModule {}


