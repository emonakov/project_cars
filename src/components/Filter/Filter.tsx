import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContainerUnstyled from '@material-ui/core/Container';

import FilterElement from '../shared/FilterElement';
import OrangeButton from '../shared/OrangeButton';
import { useContextState } from '../StateProvider';
import { fetchFilters } from '../../services/filterService';

const Container = styled(ContainerUnstyled)`
    border: 1px solid ${({ theme }) => theme.borderColor};

    && {
        padding: ${({ theme }) => theme.g3};
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: ${({ theme }) => theme.grid(60)};
    }
`;

const Filter: React.FC = () => {
    const [state, dispatch] = useContextState();
    const { manufacturers, colors, filters } = state;
    const [localFilter, setLocalFilter] = useState({
        manufacturer: '',
        color: '',
        page: 1,
        sort: 'asc',
    });

    const updateFilter = () => {
        dispatch({
            type: 'update',
            payload: {
                filters: {
                    ...filters,
                    ...localFilter,
                },
            },
        });
    };

    const updateLocalFilter = (type: string, value: string) => {
        setLocalFilter({
            ...localFilter,
            [type]: value,
        });
    };

    useEffect(() => {
        fetchFilters((data: any) => dispatch({ type: 'update', payload: { ...data } }));
    }, [dispatch]);

    return (
        <Container>
            {manufacturers && (
                <FilterElement
                    title="Manufacturers"
                    type="manufacturer"
                    defaultValue={localFilter.manufacturer}
                    onChange={updateLocalFilter}
                    values={manufacturers.map(({ name }) => name)}
                    inputProps={{
                        'data-testid': 'manufacturers',
                    }}
                />
            )}
            {colors && (
                <FilterElement
                    title="Colors"
                    type="color"
                    defaultValue={localFilter.color}
                    onChange={updateLocalFilter}
                    values={colors}
                    inputProps={{
                        'data-testid': 'colors',
                    }}
                />
            )}
            <FilterElement
                title="Sort"
                type="sort"
                defaultValue={localFilter.sort}
                onChange={updateLocalFilter}
                values={[
                    ['Mileage - Ascending', 'asc'],
                    ['Mileage - Descending', 'des'],
                ]}
                inputProps={{
                    'data-testid': 'sort',
                }}
            />
            <OrangeButton
                variant="contained"
                color="primary"
                onClick={updateFilter}
                data-testid="filter"
            >
                Filter
            </OrangeButton>
        </Container>
    );
};

export default Filter;
