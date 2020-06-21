import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Fallback from './components/Fallback';
import theme from './config/theme';

const Home = lazy(() => import('./components/Page/Home'));

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <Suspense fallback={<Fallback />}>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </Suspense>
        </Router>
    </ThemeProvider>
);

export default App;
