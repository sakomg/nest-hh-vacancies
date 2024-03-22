import { Injectable } from '@nestjs/common';
import { HhApi } from './hh.api';
import flattenObject from 'src/utils/functions/flatten';

const PROFESSIONAL_ROLE_DEV = '11';

@Injectable()
export class HhService {
  constructor(private readonly api: HhApi) {}

  async getVacanciesAsCSV(params: any) {
    const json = await this.getVacanciesAsJSON(params);
    return this.jsonToCsv(json);
  }

  async getVacanciesAsJSON(params: any) {
    const result = [];
    const pages = await this.getTotalPages(params);
    for (let i = 1; i <= pages; i++) {
      const vacancies = await this.api.fetchVacanciesByPage(PROFESSIONAL_ROLE_DEV, params.search, i);
      if (!vacancies) {
        continue;
      }
      if (!vacancies.items) {
        continue;
      }
      result.push(...vacancies.items);
    }
    return result;
  }

  async getTotalPages(params: any) {
    const vacancies = await this.api.fetchVacanciesByPage(PROFESSIONAL_ROLE_DEV, params.search, 0);

    if (!vacancies) {
      return 0;
    }

    if (!vacancies.pages) {
      return 0;
    }

    return vacancies.pages;
  }

  jsonToCsv(jsonData: Array<any>) {
    const flattenedData = jsonData.map((obj: any) => flattenObject(obj));

    const headers = Object.keys(flattenedData[0]);
    const csvHeader = headers.join(',') + '\n';
    const csvRows = flattenedData.map((obj) => headers.map((header) => JSON.stringify(obj[header])).join(','));
    const csvData = csvHeader + csvRows.join('\n');

    return csvData;
  }
}
