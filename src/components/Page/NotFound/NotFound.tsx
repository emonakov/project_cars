import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import LinkToUnstyled from '../../shared/LinkTo';

const LinkTo = styled(LinkToUnstyled)`
    color: ${({ theme }) => theme.primaryColor};
    font-size: inherit;
`;

const NotFoundWrapper = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - (80px * 2));
`;

const NotFound: React.FC = () => (
    <NotFoundWrapper>
        <Typography variant="h4">404 - Not found</Typography>
        <Typography variant="body1">Sorry, the page you are looking for does not exist.</Typography>
        <Typography variant="body1">
            <span>You can always go back to </span>
            <LinkTo to="/">homepage</LinkTo>
        </Typography>
    </NotFoundWrapper>
);

export default NotFound;
