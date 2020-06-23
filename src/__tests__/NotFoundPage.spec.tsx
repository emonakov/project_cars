import React from 'react';
import { wait } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Tests 404 page', () => {
    it('Renders the 404 page when url does not match any routes', async () => {
        const { getByText, container } = renderWithRouter(<App />, '/some/nonexistent/url');
        await wait();

        expect(getByText(/404 - Not found/i)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
