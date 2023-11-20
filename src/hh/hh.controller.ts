import { Controller, Get } from '@nestjs/common';
import { HhService } from './hh.service';

@Controller('hh')
export class HhController {
  constructor(private readonly service: HhService) {}

  @Get()
  getVacancies() {
    return this.service.getVacancies();
  }
}
