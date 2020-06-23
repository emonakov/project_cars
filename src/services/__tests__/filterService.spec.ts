import axios from 'redaxios';

import { fetchFilters, fetchCarsWithFilters } from '../filterService';
import manufacturersMock from '../../__tests__/__mock__/manufacturers.mock.json';
import colorsMock from '../../__tests__/__mock__/colors.mock.json';
import cars from '../../__tests__/__mock__/cars.mock.json';

describe('fetchFilters', () => {
    it('should call the callback function with the response data', (next) => {
        const spy = jest.spyOn(axios, 'get');
        spy.mockReturnValueOnce(Promise.resolve({ data: JSON.stringify(manufacturersMock) }));
        spy.mockReturnValueOnce(Promise.resolve({ data: JSON.stringify(colorsMock) }));

        fetchFilters((
            { manufacturers, colors }: {
                manufacturers: typeof manufacturersMock.manufacturers[],
                colors: typeof colorsMock.colors[]
            },
        ) => {
            expect(colors).toHaveLength(colorsMock.colors.length);
            expect(manufacturers).toHaveLength(manufacturersMock.manufacturers.length);
            next();
        });
    });
});

describe('fetchCarsWithFilters', () => {
    it('should call the callback function with the response data', (next) => {
        const spy = jest.spyOn(axios, 'get');
        spy.mockReturnValue(Promise.resolve({ data: JSON.stringify(cars.Audi) }));

        fetchCarsWithFilters((data: typeof cars.Audi) => {
            expect(data.totalCarsCount).toBe(cars.Audi.totalCarsCount);
            expect(data.cars[0].stockNumber).toBe(cars.Audi.cars[0].stockNumber);
            next();
        }, []);
    });
});
