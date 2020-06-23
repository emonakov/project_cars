import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const renderWithRouter = (Component: JSX.Element, initialRoute = '/') => {
    history.push(initialRoute);

    return render(
        <Router history={history}>
            {Component}
        </Router>,
    );
};

export default renderWithRouter;
