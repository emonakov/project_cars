import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Container from '../../shared/FullPageContainer';
import Filter from '../../Filter';
import CarList from '../../CarList';

const HomePageWrapper = styled(Grid)`
    margin: 0;
    padding: ${({ theme }) => theme.g5};
`;

const Home: React.FC = () => (
    <Container>
        <HomePageWrapper container justify="space-between">
            <Grid item xs={4}>
                <Filter />
            </Grid>
            <Grid item xs={7}>
                <CarList />
            </Grid>
        </HomePageWrapper>
    </Container>
);

export default Home;
