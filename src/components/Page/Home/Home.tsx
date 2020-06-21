import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Filter from '../../Filter';

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
    </HomePageWrapper>
);

export default Home;
