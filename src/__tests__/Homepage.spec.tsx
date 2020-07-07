import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { fetchFilters, fetchCarsWithFilters } from '../services/filterService';
import renderWithRouter from '../utils/renderWithRouter';
import { manufacturers } from './__mock__/manufacturers.mock.json';
import { colors } from './__mock__/colors.mock.json';
import cars from './__mock__/cars.mock.json';

jest.mock('../services/filterService');

describe('Homepage', () => {
    beforeEach(() => {
        (fetchFilters as jest.Mock).mockImplementation(() => Promise.resolve({ manufacturers, colors }));

        (fetchCarsWithFilters as jest.Mock).mockImplementation(() => Promise.resolve(cars.Audi));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the initial page', () => {
        renderWithRouter(<App />);
        expect(screen.getByText(/car sales/i)).toBeInTheDocument();
    });

    it('renders homepage and waits for all the elements', async () => {
        renderWithRouter(<App />);

        await screen.findByTestId('manufacturers');
        expect(screen.getByTestId('manufacturers')).toBeInTheDocument();
        expect(screen.getByTestId('colors')).toBeInTheDocument();
    });

    it('renders the page and changes the filter values', async () => {
        renderWithRouter(<App />);
        (fetchCarsWithFilters as jest.Mock).mockImplementation(() => Promise.resolve(cars.BMW));

        await screen.findByTestId('manufacturers');
        userEvent.type(screen.getByTestId('manufacturers'), 'BMW');
        userEvent.type(screen.getByTestId('colors'), 'white');
        userEvent.click(screen.getByTestId('filter'));

        await screen.findByText(/66926/);
        expect(screen.getByText(/66926/)).toBeInTheDocument();
        expect(screen.getByText(/65365/)).toBeInTheDocument();
        expect(screen.getByText(/65365/)).toMatchSnapshot();
        expect(screen.getByText(/66926/)).toMatchSnapshot();
    });

    it('does not render car list if it is empty', async () => {
        (fetchCarsWithFilters as jest.Mock).mockImplementation(() => Promise.resolve({}));

        renderWithRouter(<App />);

        await screen.findByTestId('car-list');
        expect(screen.getByTestId('car-list')).toBeEmpty();
    });
});
