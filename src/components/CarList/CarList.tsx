import React, { useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';

import LinkToUnstyled from '../shared/LinkTo';
import { useContextState, useContextDispatch } from '../Context';
import { fetchCarsWithFilters } from '../../services/filterService';

const CarContent = styled(CardContent)`
    display: grid;
    grid-gap: ${({ theme }) => theme.g2};
    grid-template-columns: 100px 1fr;
`;

const CarDescription = styled(CardContent)`
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
    && { background: ${({ theme }) => theme.borderColor}; }
`;

const Cars = styled(Card)`
    margin-bottom: ${({ theme }) => theme.g3};
    border: 1px solid ${({ theme }) => theme.borderColor};
`;

const LinkTo = styled(LinkToUnstyled)`
    color: ${({ theme }) => theme.primaryColor};

    &:active,
    &:hover {
        color: ${({ theme }) => theme.secondaryColor};
    }
`;

const UpperCase = styled.span`
    text-transform: uppercase;
`;

const Capitalized = styled.span`
    text-transform: capitalize;
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
                cars: any,
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
                                <ImagePlaceholder />
                                <CarDescription>
                                    <Typography variant="h6" gutterBottom>{car.modelName}</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {`Stock # ${car.stockNumber}`}
                                        <UpperCase>
                                            {` - ${car.mileage.number.toLocaleString()} ${car.mileage.unit}`}
                                        </UpperCase>
                                        <Capitalized>{` - ${car.fuelType} - ${car.color}`}</Capitalized>
                                        <CardActions>
                                            <LinkTo to={`/car/${car.stockNumber}`}>View details</LinkTo>
                                        </CardActions>
                                    </Typography>
                                </CarDescription>
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
