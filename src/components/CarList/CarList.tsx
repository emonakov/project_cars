import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

import CarsList from '../shared/CarsList';
import { useContextState } from '../StateProvider';
import { fetchCarsWithFilters } from '../../services/filterService';
import { CarInterface } from '../../interfaces/CarInterface';

const CarList: React.FC = () => {
    const [state, dispatch] = useContextState();
    const {
        filters,
        cars,
        totalCarsCount: total,
        totalPageCount: pages,
    } = state;

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
        fetchCarsWithFilters(Object.keys(filters).map((key: string) => [key, filters[key]]))
            .then(({ cars: newCars, totalCarsCount, totalPageCount }: {
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
            }));
    }, [dispatch, filters]);

    return (
        <>
            {cars && (
                <>
                    <Typography variant="h6" gutterBottom>Available cars</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {`Showing ${cars.length} of ${total}`}
                    </Typography>
                    <CarsList cars={cars} />
                    <Pagination count={pages} page={filters.page} onChange={gotoPage} />
                </>
            )}
        </>
    );
};

export default CarList;
