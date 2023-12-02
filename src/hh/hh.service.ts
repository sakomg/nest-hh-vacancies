import { Injectable } from '@nestjs/common';
import { HhApi } from './hh.api';

const VACANCIES_SEARCH_TEXT = 'node OR node.js OR nodejs';
const PROFESSIONAL_ROLE_DEV = '11';

@Injectable()
export class HhService {
  constructor(private readonly api: HhApi) {}

  async getVacanciesAsCSV() {
    const json = await this.getVacanciesAsJSON();
    return this.jsonToCsv(json);
  }

  async getVacanciesAsJSON() {
    const result = [];
    const pages = await this.getTotalPages();
    for (let i = 1; i <= pages; i++) {
      const vacancies = await this.api.fetchVacanciesByPage(PROFESSIONAL_ROLE_DEV, VACANCIES_SEARCH_TEXT, i);
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

  async getTotalPages() {
    const vacancies = await this.api.fetchVacanciesByPage(PROFESSIONAL_ROLE_DEV, VACANCIES_SEARCH_TEXT, 0);

    if (!vacancies) {
      return 0;
    }

    if (!vacancies.pages) {
      return 0;
    }

    return vacancies.pages;
  }

  jsonToCsv(items: Array<any>) {
    const replacer = (key: any, value: any) => (value === null ? '' : value);
    const header = Object.keys(items[0]);
    const csv = [
      header.join(','),
      ...items.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(',')),
    ].join('\r\n');

    return csv;
  }
}
