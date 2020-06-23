import axios from 'redaxios';

import { fetchCar } from '../carService';
import { CarInterface } from '../../interfaces/CarInterface';
import cars from '../../__tests__/__mock__/cars.mock.json';

describe('fetchCar', () => {
    it('should call the callback function with the response data', (done) => {
        const spy = jest.spyOn(axios, 'get');
        const [selectedCar] = cars.Audi.cars;
        spy.mockReturnValue(Promise.resolve({ data: JSON.stringify({ car: selectedCar }) }));

        fetchCar((car: CarInterface) => {
            expect(car.stockNumber).toBe(selectedCar.stockNumber);
            done();
        }, String(selectedCar.stockNumber));
    });

    it('should call the callback function with the error data', (done) => {
        const spy = jest.spyOn(axios, 'get');
        const [selectedCar] = cars.Audi.cars;
        spy.mockReturnValue(Promise.reject(new Error('something went wrong')));

        fetchCar((_: any, err: Error) => {
            expect(err.message).toBe('something went wrong');
            done();
        }, String(selectedCar.stockNumber));
    });
});
