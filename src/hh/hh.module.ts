import { Module } from '@nestjs/common';
import { HhService } from './hh.service';
import { HhController } from './hh.controller';
import { HttpModule } from '@nestjs/axios';
import { HhApi } from './hh.api';

@Module({
  providers: [HhService, HhApi],
  controllers: [HhController],
  imports: [HttpModule],
})
export class HhModule {}
