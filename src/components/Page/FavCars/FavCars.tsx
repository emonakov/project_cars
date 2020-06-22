import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import Container from '../../shared/FullPageContainer';
import CarsList from '../../shared/CarsList';
import { CarInterface } from '../../../interfaces/CarInterface';
import { getFavCars } from '../../../utils/storage';

const FavPageWrapper = styled(Grid)`
    margin: 0;
    padding: ${({ theme }) => theme.g5};
`;

const FavCars: React.FC = () => {
    const [cars, setCars] = useState<CarInterface[]>();

    useEffect(() => {
        setCars(getFavCars());
    }, []);

    return (
        <Container>
            <FavPageWrapper container justify="space-between">
                <aside>
                    <Typography variant="h5" gutterBottom>Favorite cars</Typography>
                    <Typography variant="body1" gutterBottom>{`${cars?.length} cars in this list`}</Typography>
                </aside>
                <Grid item xs={7}>
                    {cars && <CarsList cars={cars} />}
                </Grid>
            </FavPageWrapper>
        </Container>
    );
};

export default FavCars;
