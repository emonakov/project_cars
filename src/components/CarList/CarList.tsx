import React, { useEffect } from 'react';

import { useContextState, useContextDispatch } from '../Context';
import { fetchCarsWithFilters } from '../../services/filterService';

const CarList: React.FC = () => {
    const { filters, cars } = useContextState();
    const dispatch = useContextDispatch();

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

    console.log(cars);

    return (
        <>
            <h1>CarList</h1>
            {cars && cars.map((car) => (
                <div>{car.modelName}</div>
            ))}
        </>
    );
};

export default CarList;
