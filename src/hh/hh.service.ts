import { Injectable } from '@nestjs/common';
import { HhApi } from './hh.api';

const VACANCIES_SEARCH_TEXT = 'node OR node.js OR salesforce';
const PROFESSIONAL_ROLE_DEV = '11';

@Injectable()
export class HhService {
  constructor(private readonly api: HhApi) {}

  async getVacancies() {
    const totalArray = [];
    const pages = await this.defineTotalPages();
    console.log(pages);
    for (let i = 1; i <= pages; i++) {
      const vacancies = await this.api.fetchVacanciesByPage(
        PROFESSIONAL_ROLE_DEV,
        VACANCIES_SEARCH_TEXT,
        i,
      );
      if (vacancies) {
        totalArray.push(...vacancies.items);
      }
    }
    console.dir(totalArray, { depth: null });
    console.log('total', totalArray.length);

    return totalArray;
  }

  async defineTotalPages() {
    const vacancies = await this.api.fetchVacanciesByPage(
      PROFESSIONAL_ROLE_DEV,
      VACANCIES_SEARCH_TEXT,
      0,
    );

    return vacancies.pages;
  }
}
