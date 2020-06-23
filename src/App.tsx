import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import StateProvider from './components/StateProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Fallback from './components/Fallback';
import theme from './config/theme';

const Home = lazy(() => import('./components/Page/Home'));
const CarDetails = lazy(() => import('./components/Page/CarDetails'));
const FavCars = lazy(() => import('./components/Page/FavCars'));
const NotFound = lazy(() => import('./components/Page/NotFound'));

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <Suspense fallback={<Fallback />}>
            <Header />
            <StateProvider>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/car/fav" exact component={FavCars} />
                    <Route path="/car/:stockId(\d+)" exact component={CarDetails} />
                    <Route component={NotFound} />
                </Switch>
            </StateProvider>
            <Footer />
        </Suspense>
    </ThemeProvider>
);

export default App;
