import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { fetchCarsWithFilters } from '../services/filterService';
import { fetchCar } from '../services/carService';
import renderWithRouter from '../utils/renderWithRouter';
import cars from './__mock__/cars.mock.json';

jest.mock('../services/filterService');
jest.mock('../services/carService');

describe('CarDetails', () => {
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

    it('renders the initial page and navigates to the car view page', async () => {
        renderWithRouter(<App />);
        const carLink = await screen.findByTestId('car-80765');

        userEvent.click(carLink);

        await screen.findByText(/80765/);

        expect(screen.getByTestId('fav-button')).toBeInTheDocument();
        expect(screen.getByTestId('car-details')).toMatchSnapshot();
    });

    it('should save the car in the local storage', () => {
        renderWithRouter(<App />, '/car/80765');

        userEvent.click(screen.getByTestId('fav-button'));
        expect(screen.getByTestId('fav-button')).toHaveTextContent(/remove/i);
        expect(localStorage.getItem('favCars')).not.toBeNull();
        expect(localStorage.getItem('favCars')).not.toBe('[]');
    });

    it('should remove the car from the local storage', () => {
        renderWithRouter(<App />, '/car/80765');

        userEvent.click(screen.getByTestId('fav-button'));
        userEvent.click(screen.getByTestId('fav-button'));
        expect(localStorage.getItem('favCars')).toBe('[]');
    });

    it('should show remove button if the car is in the local storage', () => {
        window.localStorage.setItem('favCars', JSON.stringify([cars.Audi.cars[0]]));
        renderWithRouter(<App />, '/car/80765');

        expect(screen.getByTestId('fav-button')).toHaveTextContent(/remove/i);
    });

    it('throws the error if something happened in the service ', async () => {
        (fetchCar as jest.Mock).mockImplementation((callback: Function) => {
            callback(null, new Error('something went wrong'));
        });

        renderWithRouter(<App />, '/car/80765');

        const errorMessage = await screen.findByText(/something went wrong/i);
        expect(errorMessage).toMatchSnapshot();
    });
});
