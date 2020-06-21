import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('Renders the initial page', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/car sales/i);
    expect(linkElement).toBeInTheDocument();
});
