import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';

import CarDescription from '../CarDescription';
import { CarInterface } from '../../../interfaces/CarInterface';

interface CarsListProps {
    cars: CarInterface[];
}

const CarContent = styled(CardContent)`
    display: grid;
    grid-gap: ${({ theme }) => theme.g2};
    grid-template-columns: ${({ theme }) => theme.g20} 1fr;
`;

const CarDescriptionWrapper = styled(CardContent)`
    && {
        padding: 0;

        .MuiCardActions-root {
            padding-left: 0;
        }

        &:last-child {
            padding-bottom: 0;
        }
    }
`;

const ImagePlaceholder = styled(Paper)`
    width: ${({ theme }) => theme.grid(14)};
    height: ${({ theme }) => theme.grid(14)};
    display: flex;
    justify-content: center;
    align-items: center;
    && { background: ${({ theme }) => theme.borderColor}; }
`;

const CarPhoto = styled.img`
    max-width: 100%;
`;

const Cars = styled(Card)`
    margin-bottom: ${({ theme }) => theme.g3};
    border: 1px solid ${({ theme }) => theme.borderColor};
`;

const CarsList: React.FC<CarsListProps> = ({ cars }) => (
    <>
        {cars.map((car) => (
            <Cars key={car.stockNumber} elevation={0}>
                <CarContent>
                    {car.pictureUrl
                        ? (
                            <CarPhoto src={car.pictureUrl} alt={car.modelName} />
                        )
                        : <ImagePlaceholder />}
                    <CarDescriptionWrapper>
                        <CarDescription
                            car={car}
                            headerType="h6"
                            descriptionType="caption"
                            showLink
                        />
                    </CarDescriptionWrapper>
                </CarContent>
            </Cars>
        ))}
    </>
);

export default CarsList;
