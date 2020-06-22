import React from 'react';
import Container from '@material-ui/core/Container';

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
                    <h1>Something went wrong.</h1>
                </Container>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
