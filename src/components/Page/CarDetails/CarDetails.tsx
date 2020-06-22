import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import Car from '../../Car';
import ErrorBoundary from '../../ErrorBoundary';
import FullPageContainerUnstyled from '../../shared/FullPageContainer';

const FullPageContainer = styled(FullPageContainerUnstyled)`
    && { padding: 0 }
`;

const BannerPlaceholder = styled.section`
    width: 100%;
    height: ${({ theme }) => theme.grid(80)};
    background: ${({ theme }) => theme.borderColor};
`;

const CarDetails: React.FC = () => (
    <>
        <FullPageContainer>
            <BannerPlaceholder />
        </FullPageContainer>
        <ErrorBoundary>
            <Container>
                <Car />
            </Container>
        </ErrorBoundary>
    </>
);

export default CarDetails;
