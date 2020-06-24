import React from 'react';
import { wait } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import cars from './__mock__/cars.mock.json';

describe('Tests favorites page', () => {
    afterEach(() => {
        window.localStorage.clear();
    });

    it('Renders the favorites page without cars in the local storage', async () => {
        const { getByText } = renderWithRouter(<App />, '/car/fav');
        await wait();

        expect(getByText(/0 cars in this list/i)).toBeInTheDocument();
    });

    it('Renders the favorites page with cars in the local storage', async () => {
        window.localStorage.setItem('favCars', JSON.stringify([...cars.BMW.cars]));
        const { getByText } = renderWithRouter(<App />, '/car/fav');
        await wait();

        expect(getByText(`${cars.BMW.cars.length} cars in this list`)).toBeInTheDocument();
    });
});
