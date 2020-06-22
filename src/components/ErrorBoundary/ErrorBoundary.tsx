import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled(Container)`
    && {
        display: flex;
        justify-content: center;
        padding: 60px;
    }

    .MuiTypography-root {
        color: ${({ theme }) => theme.primaryColor};
    }
`;

class ErrorBoundary extends React.Component {
    state: { hasError: boolean } = {
        hasError: false,
    };

    static getDerivedStateFromError(): any {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render(): any {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
        // You can render any custom fallback UI
            return (
                <Wrapper>
                    <Typography variant="h4">Something went wrong.</Typography>
                </Wrapper>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
