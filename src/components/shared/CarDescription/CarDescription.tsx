import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

import LinkToUnstyled from '../LinkTo';
import { CarInterface } from '../../../interfaces/CarInterface';

interface CarDescriptionProps {
    car: CarInterface;
    headerType: any;
    descriptionType: any;
    showLink?: boolean;
}

const UpperCase = styled.span`
    text-transform: uppercase;
`;

const Capitalized = styled.span`
    text-transform: capitalize;
`;

const LinkTo = styled(LinkToUnstyled)`
    color: ${({ theme }) => theme.primaryColor};

    &:active,
    &:hover {
        color: ${({ theme }) => theme.secondaryColor};
    }
`;

const CarDescription: React.FC<CarDescriptionProps> = ({
    car,
    headerType,
    descriptionType,
    showLink,
}) => (
    <>
        <Typography variant={headerType} gutterBottom>{car.modelName}</Typography>
        <Typography variant={descriptionType} display="block" gutterBottom>
            {`Stock # ${car.stockNumber}`}
            <UpperCase>
                {` - ${car.mileage.number.toLocaleString()} ${car.mileage.unit}`}
            </UpperCase>
            <Capitalized>{` - ${car.fuelType} - ${car.color}`}</Capitalized>
            {showLink && (
                <CardActions>
                    <LinkTo to={`/car/${car.stockNumber}`} data-testid={`car-${car.stockNumber}`}>View details</LinkTo>
                </CardActions>
            )}
        </Typography>
    </>
);

CarDescription.defaultProps = {
    showLink: false,
};

export default CarDescription;
