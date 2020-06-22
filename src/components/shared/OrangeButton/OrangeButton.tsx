import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const OrangeButton = styled(Button)`
    && {
        background-color: ${({ theme }) => theme.primaryColor};
        width: 128px;
        align-self: flex-end;
        height: 32px;

        &:hover {
            background-color: ${({ theme }) => theme.secondaryColor};
        }
    }
`;

export default OrangeButton;
