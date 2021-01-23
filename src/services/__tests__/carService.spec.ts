import axios from 'redaxios';

import { fetchCar } from '../carService';
import cars from '../../__tests__/__mock__/cars.mock.json';

describe('fetchCar', () => {
    it('should call the callback function with the response data', async () => {
        const spy = jest.spyOn(axios, 'get');
        const [selectedCar] = cars.Audi.cars;
        spy.mockReturnValue(Promise.resolve({ data: JSON.stringify({ car: selectedCar }) }));

        const car = await fetchCar(String(selectedCar.stockNumber));
        expect(car.stockNumber).toBe(selectedCar.stockNumber);
    });

    it('should call the callback function with the error data', async () => {
        const spy = jest.spyOn(axios, 'get');
        const [selectedCar] = cars.Audi.cars;
        spy.mockReturnValue(Promise.reject(new Error('something went wrong')));
        try {
            await fetchCar(String(selectedCar.stockNumber));
        } catch (e) {
            expect(e.message).toBe('something went wrong');
        }
    });
});
