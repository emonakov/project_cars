import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Loading from 'react-loading';

const FallbackContainer = styled.section`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const Fallback: React.FC = () => {
    const theme = useContext(ThemeContext);

    return (
        <FallbackContainer>
            <Loading type="bars" color={theme.buttonColor} />
        </FallbackContainer>
    );
};

export default Fallback;
