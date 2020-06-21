import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import LinkToUnstyled from '../shared/LinkTo';

const WrappingGrid = styled(Grid)`
    && {
        height: ${({ theme }) => theme.grid(16)};
    }
`;

const LinkTo = styled(LinkToUnstyled)`
    padding: 0 12px;
`;

const Header: React.FC = () => (
    <Container>
        <WrappingGrid container spacing={3} justify="space-between" alignItems="center">
            <Grid item md={4}>
                <Typography variant="h5">Car Sales</Typography>
            </Grid>
            <Grid item md={4}>
                <Grid container spacing={3} justify="flex-end">
                    <LinkTo to="/">Purchase</LinkTo>
                    <LinkTo to="/">My orders</LinkTo>
                    <LinkTo to="/">Sell</LinkTo>
                </Grid>
            </Grid>
        </WrappingGrid>
    </Container>
);

export default Header;
