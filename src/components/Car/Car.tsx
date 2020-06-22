import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CarDescription from '../shared/CarDescription';
import OrangeButton from '../shared/OrangeButton';

import { fetchCar } from '../../services/carService';
import { CarInterface } from '../../interfaces/CarInterface';
import { saveFavCar, isFavCar, removeFavCar } from '../../utils/storage';

const CarDetailsWrapper = styled.section`
    display: grid;
    grid-template-columns: repeat(2, ${({ theme }) => theme.grid(90)});
    gap: ${({ theme }) => theme.g4};
    justify-content: center;
`;

const FavContent = styled(CardContent)`
    justify-self: end;
`;

const FavWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-around;
    width: ${({ theme }) => theme.grid(45)};
    height: ${({ theme }) => theme.g20};
    border: 1px solid ${({ theme }) => theme.borderColor};
    padding: ${({ theme }) => theme.g3};
`;

const Car: React.FC = () => {
    const { stockId } = useParams<{stockId: string}>();
    const [car, setCar] = useState<CarInterface>();
    const [error, setHasError] = useState<Error>();
    const [savedFav, setSavedFav] = useState<Boolean>();

    const favCar = () => {
        if (car) {
            if (!savedFav) {
                saveFavCar(car);
                setSavedFav(true);
            } else {
                removeFavCar(car);
                setSavedFav(false);
            }
        }
    };

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
        if (car && isFavCar(car)) {
            setSavedFav(true);
        }
    }, [car]);

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
                    <Typography variant="body2">
                        This car is currently available and can be delivered as soon as
                        tomorrow morning. Please be aware that delivery times shown in
                        this page are not definitive and may change due to bad weather
                        conditions
                    </Typography>
                </CardContent>
                <FavContent>
                    <FavWrapper>
                        <Typography variant="caption">
                            If you like this car, click the button and
                            save it in your collection of favorite
                            items.
                        </Typography>
                        <OrangeButton
                            variant="contained"
                            color="primary"
                            onClick={favCar}
                        >
                            {savedFav ? 'Remove' : 'Save'}
                        </OrangeButton>
                    </FavWrapper>
                </FavContent>
            </CarDetailsWrapper>
        )
        : null;
};

export default Car;
