import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Tests 404 page', () => {
    it('Renders the 404 page when url does not match any routes', async () => {
        renderWithRouter(<App />, '/some/nonexistent/url');
        const errorMessage = await screen.findByText(/404 - Not found/i);

        expect(errorMessage).toMatchSnapshot();
    });
});
