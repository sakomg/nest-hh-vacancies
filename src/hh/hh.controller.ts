import { Controller, Get } from '@nestjs/common';
import { HhService } from './hh.service';

@Controller('vacancy')
export class HhController {
  constructor(private readonly service: HhService) {}

  @Get('json')
  getVacanciesAsJSON() {
    return this.service.getVacanciesAsJSON();
  }

  @Get('csv')
  getVacanciesAsCSV() {
    return this.service.getVacanciesAsCSV();
  }
}
