import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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
                <Container>
                    <Typography variant="h4">Something went wrong.</Typography>
                </Container>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
