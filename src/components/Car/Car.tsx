import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';

import CarDescription from '../shared/CarDescription';

import { fetchCar } from '../../services/carService';
import { CarInterface } from '../../interfaces/CarInterface';

const CarDetailsWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr ${({ theme }) => theme.grid(100)};
    gap: ${({ theme }) => theme.g4};
`;

const CarDetails: React.FC = () => {
    const { stockId } = useParams<{stockId: string}>();
    const [car, setCar] = useState<CarInterface>();
    const [error, setHasError] = useState<Error>();

    useEffect(() => {
        fetchCar((carDetails: CarInterface, err: Error) => {
            if (err) {
                setHasError(err);
            } else {
                setCar(carDetails);
            }
        }, stockId);
    }, [stockId]);

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    return car
        ? (
            <CarDetailsWrapper>
                <CardContent>
                    <CarDescription
                        car={car}
                        headerType="h4"
                        descriptionType="body1"
                    />
                </CardContent>
            </CarDetailsWrapper>
        )
        : null;
};

export default CarDetails;
