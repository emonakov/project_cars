import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ContainerUnstyled from '../shared/FullPageContainer';
import LinkToUnstyled from '../shared/LinkTo';

const WrappingGrid = styled(Grid)`
    && {
        height: ${({ theme }) => theme.grid(16)};
    }
`;

const LinkTo = styled(LinkToUnstyled)`
    padding: 0 12px;
`;

const Title = styled(Typography)`
    && {
        font-size: 32px;
        font-weight: 700;
    }
`;

const TitleLink = styled(LinkTo)`
    text-transform: uppercase;
    font-size: inherit;
`;

const Container = styled(ContainerUnstyled)`
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const Header: React.FC = () => (
    <header>
        <Container>
            <WrappingGrid container spacing={3} justify="space-between" alignItems="center">
                <Grid item md={4}>
                    <Title variant="h1">
                        <TitleLink to="/">Car Sales</TitleLink>
                    </Title>
                </Grid>
                <Grid item md={4}>
                    <Grid container spacing={3} justify="flex-end">
                        <LinkTo to="/car/fav">Favorites</LinkTo>
                        <LinkTo to="/">My orders</LinkTo>
                        <LinkTo to="/">Sell</LinkTo>
                    </Grid>
                </Grid>
            </WrappingGrid>
        </Container>
    </header>
);

export default Header;
