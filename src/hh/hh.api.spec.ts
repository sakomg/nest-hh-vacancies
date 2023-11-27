import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { HhApi } from './hh.api';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { HH_API_URL } from '../utils/constants/api';

describe('HhApi', () => {
  let hhApi: HhApi;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HhApi, HttpService],
    }).compile();

    hhApi = module.get<HhApi>(HhApi);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('fetchVacanciesByPage', () => {
    it('should fetch vacancies by page', async () => {
      const professionalRole = 'developer';
      const searchText = 'nestjs';
      const page = 1;

      const expectedResult = { data: 'mocked data' };
      const axiosResponse: AxiosResponse<any, any> = {
        data: expectedResult,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: null,
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));

      const result = await hhApi.fetchVacanciesByPage(professionalRole, searchText, page);

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining(HH_API_URL + '/vacancies'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
      expect(result).toEqual(expectedResult.data);
    });

    it('should throw an error if an exception occurs', async () => {
      const professionalRole = 'developer';
      const searchText = 'nestjs';
      const page = 1;

      jest.spyOn(httpService, 'get').mockImplementation(() => {
        throw new Error('Some error');
      });

      await expect(hhApi.fetchVacanciesByPage(professionalRole, searchText, page)).rejects.toThrowError('Some error');
    });
  });
});
