import { Module } from '@nestjs/common';
import { TransientTestModule } from './TransientTestModule';

@Module({
  imports: [TransientTestModule],
  controllers: [],
  providers: [],
})
export class AppModule{}

