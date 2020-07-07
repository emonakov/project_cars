import axios from 'redaxios';

import { fetchFilters, fetchCarsWithFilters } from '../filterService';
import manufacturersMock from '../../__tests__/__mock__/manufacturers.mock.json';
import colorsMock from '../../__tests__/__mock__/colors.mock.json';
import cars from '../../__tests__/__mock__/cars.mock.json';

describe('filtersService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('fetchFilters should receive manufacturers and colors list', async () => {
        const spy = jest.spyOn(axios, 'get');
        spy.mockReturnValueOnce(Promise.resolve({ data: JSON.stringify(manufacturersMock) }));
        spy.mockReturnValueOnce(Promise.resolve({ data: JSON.stringify(colorsMock) }));

        const { manufacturers, colors } = await fetchFilters();

        expect(colors).toHaveLength(colorsMock.colors.length);
        expect(manufacturers).toHaveLength(manufacturersMock.manufacturers.length);
    });

    it('fetchCarsWithFilters should receive a cars list', async () => {
        const spy = jest.spyOn(axios, 'get');
        spy.mockReturnValue(Promise.resolve({ data: JSON.stringify(cars.Audi) }));

        const data = await fetchCarsWithFilters([['page', 1], ['sort', 'asc']]);

        expect(spy).toHaveBeenLastCalledWith('/api/cars?&page=1&sort=asc');
        expect(data.totalCarsCount).toBe(cars.Audi.totalCarsCount);
        expect(data.cars[0].stockNumber).toBe(cars.Audi.cars[0].stockNumber);
    });
});
