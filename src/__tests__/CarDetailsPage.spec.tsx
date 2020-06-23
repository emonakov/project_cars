import React from 'react';
import { wait, fireEvent } from '@testing-library/react';

import App from '../App';
import { fetchCarsWithFilters } from '../services/filterService';
import { fetchCar } from '../services/carService';
import renderWithRouter from '../utils/renderWithRouter';
import cars from './__mock__/cars.mock.json';

jest.mock('../services/filterService');
jest.mock('../services/carService');

describe('Tests CarDetails page', () => {
    beforeEach(() => {
        (fetchCarsWithFilters as jest.Mock).mockImplementation((callback: Function) => {
            callback(cars.Audi);
        });

        (fetchCar as jest.Mock).mockImplementation((callback: Function) => {
            callback(cars.Audi.cars[0]);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        window.localStorage.clear();
    });

    it('Renders the initial page and navigates to the car view page', async () => {
        const { container, getByText, getByTestId } = renderWithRouter(<App />);
        await wait();

        const carLink = getByTestId('car-80765');
        fireEvent.click(carLink);
        await wait();

        expect(getByText(/80765/)).toBeInTheDocument();
        expect(getByTestId('fav-button')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('Should save the car in the local storage', () => {
        const { getByTestId } = renderWithRouter(<App />, '/car/80765');
        const favButton = getByTestId('fav-button');

        fireEvent.click(favButton);
        expect(favButton).toHaveTextContent(/remove/i);
        expect(localStorage.getItem('favCars')).not.toBeNull();
        expect(localStorage.getItem('favCars')).not.toBe('[]');
    });

    it('Should remove the car from the local storage', () => {
        const { getByTestId } = renderWithRouter(<App />, '/car/80765');
        const favButton = getByTestId('fav-button');

        fireEvent.click(favButton);
        fireEvent.click(favButton);
        expect(localStorage.getItem('favCars')).toBe('[]');
    });

    it('Should show remove button if the car is in the local storage', () => {
        window.localStorage.setItem('favCars', JSON.stringify([cars.Audi.cars[0]]));
        const { getByTestId } = renderWithRouter(<App />, '/car/80765');
        const favButton = getByTestId('fav-button');

        expect(favButton).toHaveTextContent(/remove/i);
    });

    it('Throws the error if something happened in the service ', async () => {
        (fetchCar as jest.Mock).mockImplementation((callback: Function) => {
            callback(null, new Error('something went wrong'));
        });

        const { getByText } = renderWithRouter(<App />, '/car/80765');
        await wait();

        expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
});
