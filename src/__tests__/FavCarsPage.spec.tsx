import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import cars from './__mock__/cars.mock.json';

describe('Tests favorites page', () => {
    afterEach(() => {
        window.localStorage.clear();
    });

    it('Renders the favorites page without cars in the local storage', async () => {
        renderWithRouter(<App />, '/car/fav');

        const carsCounter = await screen.findByText(/0 cars in this list/i);
        expect(carsCounter).toMatchSnapshot();
    });

    it('Renders the favorites page with cars in the local storage', async () => {
        window.localStorage.setItem('favCars', JSON.stringify([...cars.BMW.cars]));
        renderWithRouter(<App />, '/car/fav');
        const carsCounter = await screen.findByText(`${cars.BMW.cars.length} cars in this list`);

        expect(carsCounter).toMatchSnapshot();
    });
});
