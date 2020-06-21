import React, { useEffect } from 'react';
import styled from 'styled-components';
import ContainerUnstyled from '@material-ui/core/Container';

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
        height: ${({ theme }) => theme.grid(40)};
    }
`;

const Filter: React.FC = () => {
    const { manufacturers, colors, filters } = useContextState();
    const dispatch = useContextDispatch();

    const updateFilter = (type: string, value: string|number) => {
        dispatch({
            type: 'update',
            payload: {
                filters: {
                    ...filters,
                    [type]: value,
                },
            },
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
                    defaultValue={filters.manufacturer}
                    onChange={updateFilter}
                    values={manufacturers.map(({ name }) => name)}
                />
            )}
            {colors && (
                <FilterElement
                    title="Colors"
                    type="color"
                    defaultValue={filters.color}
                    onChange={updateFilter}
                    values={colors}
                />
            )}
        </Container>
    );
};

export default Filter;
