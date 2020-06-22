import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    height: ${({ theme }) => theme.grid(16)};
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.borderColor};
    position: sticky;
`;

const Footer: React.FC = () => (
    <FooterWrapper>
        ©    ¯\_(ツ)_/¯    2020
    </FooterWrapper>
);

export default Footer;
