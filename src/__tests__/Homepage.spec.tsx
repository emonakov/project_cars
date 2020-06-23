import React from 'react';
import { wait, fireEvent } from '@testing-library/react';

import App from '../App';
import { fetchFilters, fetchCarsWithFilters } from '../services/filterService';
import renderWithRouter from '../utils/renderWithRouter';
import { manufacturers } from './__mock__/manufacturers.mock.json';
import { colors } from './__mock__/colors.mock.json';
import cars from './__mock__/cars.mock.json';

jest.mock('../services/filterService');

describe('Tests homepage', () => {
    beforeEach(() => {
        (fetchFilters as jest.Mock).mockImplementation((callback: Function) => {
            callback({ manufacturers, colors });
        });

        (fetchCarsWithFilters as jest.Mock).mockImplementation((callback: Function) => {
            callback(cars.Audi);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders the initial page', () => {
        const { getByText } = renderWithRouter(<App />);
        const linkElement = getByText(/car sales/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('Renders homepage and waits for all the elements', async () => {
        const { container, getByTestId } = renderWithRouter(<App />);
        await wait();

        const manufacturersFilter = getByTestId('manufacturers');
        const colorsFilter = getByTestId('colors');
        expect(manufacturersFilter).toBeInTheDocument();
        expect(colorsFilter).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('Renders the page and changes the filter values', async () => {
        const { container, getByTestId, getByText } = renderWithRouter(<App />);
        await wait();

        (fetchCarsWithFilters as jest.Mock).mockImplementation((callback: Function) => {
            callback(cars.BMW);
        });
        const manufacturersFilter = getByTestId('manufacturers');
        const colorsFilters = getByTestId('colors');
        const filterCta = getByTestId('filter');

        fireEvent.change(manufacturersFilter, { target: { value: 'BMW' } });
        fireEvent.change(colorsFilters, { target: { value: 'white' } });
        fireEvent.click(filterCta);
        await wait();

        expect(getByText(/66926/)).toBeInTheDocument();
        expect(getByText(/65365/)).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('Does not render car list if it is empty', async () => {
        (fetchCarsWithFilters as jest.Mock).mockImplementation((callback: Function) => {
            callback({});
        });

        const { container } = renderWithRouter(<App />);
        await wait();

        expect(container).toMatchSnapshot();
    });
});
