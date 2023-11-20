import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://api.hh.ru/vacancies';

@Injectable()
export class HhApi {
  constructor(private readonly http: HttpService) {}

  async fetchVacanciesByPage(
    professionalRole: string,
    searchText: string,
    page: number,
  ) {
    try {
      let url = `${BASE_URL}?professional_roles=${professionalRole}&text=${searchText}&per_page=100`;
      if (page > 0) {
        url += `&page=${page}`;
      }

      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await firstValueFrom(
        this.http.get(url, requestConfig).pipe(map((res) => res)),
      );

      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
