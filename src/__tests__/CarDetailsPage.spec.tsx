import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { fetchCarsWithFilters, fetchFilters } from '../services/filterService';
import { fetchCar } from '../services/carService';
import renderWithRouter from '../utils/renderWithRouter';
import cars from './__mock__/cars.mock.json';
import { manufacturers } from './__mock__/manufacturers.mock.json';
import { colors } from './__mock__/colors.mock.json';

jest.mock('../services/filterService');
jest.mock('../services/carService');

describe('CarDetails', () => {
    beforeEach(() => {
        (fetchCarsWithFilters as jest.Mock).mockImplementation(() => Promise.resolve(cars.Audi));
        (fetchFilters as jest.Mock).mockImplementation(() => Promise.resolve({ manufacturers, colors }));
        (fetchCar as jest.Mock).mockImplementation(() => Promise.resolve(cars.Audi.cars[0]));
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

    it('should save the car in the local storage', async () => {
        renderWithRouter(<App />, '/car/80765');

        const favButton = await screen.findByTestId('fav-button');
        userEvent.click(favButton);
        expect(screen.getByTestId('fav-button')).toHaveTextContent(/remove/i);
        expect(localStorage.getItem('favCars')).not.toBeNull();
        expect(localStorage.getItem('favCars')).not.toBe('[]');
    });

    it('should remove the car from the local storage', async () => {
        renderWithRouter(<App />, '/car/80765');
        const favButton = await screen.findByTestId('fav-button');
        userEvent.click(favButton);
        userEvent.click(favButton);
        expect(localStorage.getItem('favCars')).toBe('[]');
    });

    it('should show remove button if the car is in the local storage', async () => {
        window.localStorage.setItem('favCars', JSON.stringify([cars.Audi.cars[0]]));
        renderWithRouter(<App />, '/car/80765');
        const favButton = await screen.findByTestId('fav-button');

        expect(favButton).toHaveTextContent(/remove/i);
    });

    it('throws the error if something happened in the service ', async () => {
        (fetchCar as jest.Mock).mockImplementation(() => '');

        renderWithRouter(<App />, '/car/80765');

        const errorMessage = await screen.findByText(/something went wrong/i);
        expect(errorMessage).toMatchSnapshot();
    });
});
