import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContainerUnstyled from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import FilterElement from '../shared/FilterElement';
import { useContextState, useContextDispatch } from '../Context';
import { fetchFilters } from '../../services/filterService';

const Container = styled(ContainerUnstyled)`
    border: 1px solid ${({ theme }) => theme.borderColor};

    && {
        padding: ${({ theme }) => theme.g3};
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: ${({ theme }) => theme.grid(50)};
    }
`;

const Filter: React.FC = () => {
    const [localFilter, setLocalFilter] = useState({
        manufacturer: '',
        color: '',
    });
    const { manufacturers, colors, filters } = useContextState();
    const dispatch = useContextDispatch();

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

    useEffect(() => {
        setLocalFilter({ ...filters });
    }, [filters]);

    return (
        <Container>
            {manufacturers && (
                <FilterElement
                    title="Manufacturers"
                    type="manufacturer"
                    defaultValue={localFilter.manufacturer}
                    onChange={updateLocalFilter}
                    values={manufacturers.map(({ name }) => name)}
                />
            )}
            {colors && (
                <FilterElement
                    title="Colors"
                    type="color"
                    defaultValue={localFilter.color}
                    onChange={updateLocalFilter}
                    values={colors}
                />
            )}
            {(colors || manufacturers) && (
                <Button variant="contained" color="primary" onClick={updateFilter}>
                    Filter
                </Button>
            )}
        </Container>
    );
};

export default Filter;
