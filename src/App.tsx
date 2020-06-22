import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ContextProvider from './components/Context';
import Header from './components/Header';
import Footer from './components/Footer';
import Fallback from './components/Fallback';
import theme from './config/theme';

const Home = lazy(() => import('./components/Page/Home'));
const CarDetails = lazy(() => import('./components/Page/CarDetails'));

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <Suspense fallback={<Fallback />}>
                <Header />
                <ContextProvider>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/car/:stockId(\d+)" exact component={CarDetails} />
                    </Switch>
                </ContextProvider>
                <Footer />
            </Suspense>
        </Router>
    </ThemeProvider>
);

export default App;
