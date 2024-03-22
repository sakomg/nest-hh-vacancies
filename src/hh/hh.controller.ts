import { Controller, Get, Query } from '@nestjs/common';
import { HhService } from './hh.service';

@Controller('vacancy')
export class HhController {
  constructor(private readonly service: HhService) {}

  @Get('json')
  getVacanciesAsJSON(@Query() params: any) {
    return this.service.getVacanciesAsJSON(params);
  }

  @Get('csv')
  getVacanciesAsCSV(@Query() params: any) {
    return this.service.getVacanciesAsCSV(params);
  }
}
