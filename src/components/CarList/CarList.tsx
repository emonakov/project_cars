import React, { useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';

import CarDescription from '../shared/CarDescription';
import { useContextState, useContextDispatch } from '../Context';
import { fetchCarsWithFilters } from '../../services/filterService';
import { CarInterface } from '../../interfaces/CarInterface';

const CarContent = styled(CardContent)`
    display: grid;
    grid-gap: ${({ theme }) => theme.g2};
    grid-template-columns: 100px 1fr;
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

const CarList: React.FC = () => {
    const {
        filters,
        cars,
        totalCarsCount: total,
        totalPageCount: pages,
    } = useContextState();
    const dispatch = useContextDispatch();

    const gotoPage = (e: any, value: number) => {
        dispatch({
            type: 'update',
            payload: {
                filters: {
                    ...filters,
                    page: value,
                },
            },
        });
    };

    useEffect(() => {
        fetchCarsWithFilters(
            ({ cars: newCars, totalCarsCount, totalPageCount }: {
                cars: CarInterface[],
                totalCarsCount: number,
                totalPageCount: number,
            }) => dispatch({
                type: 'update',
                payload: {
                    cars: newCars,
                    totalCarsCount,
                    totalPageCount,
                },
            }),
            Object.keys(filters).map((key: string) => [key, filters[key]]),
        );
    }, [dispatch, filters]);

    return (
        <>
            {cars && (
                <>
                    <Typography variant="h6" gutterBottom>Available cars</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {`Showing ${cars.length} of ${total}`}
                    </Typography>
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
                    <Pagination count={pages} page={filters.page} onChange={gotoPage} />
                </>
            )}
        </>
    );
};

export default CarList;
