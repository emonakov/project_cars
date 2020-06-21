import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Filter from '../../Filter';
import CarList from '../../CarList';

const HomePageWrapper = styled(Grid)`
    && {
        margin: 0;
    }
`;

const Home: React.FC = () => (
    <HomePageWrapper container spacing={6} justify="space-between">
        <Grid item md={4}>
            <Filter />
        </Grid>
        <Grid item md={6}>
            <CarList />
        </Grid>
    </HomePageWrapper>
);

export default Home;
