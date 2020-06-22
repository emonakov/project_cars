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

const OrangeButton = styled(Button)`
    && {
        background-color: ${({ theme }) => theme.primaryColor};
        width: 128px;
        align-self: flex-end;
        height: 32px;

        &:hover {
            background-color: ${({ theme }) => theme.secondaryColor};
        }
    }
`;

const Filter: React.FC = () => {
    const { manufacturers, colors, filters } = useContextState();
    const dispatch = useContextDispatch();
    const [localFilter, setLocalFilter] = useState({
        manufacturer: '',
        color: '',
        page: 1,
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
                <OrangeButton variant="contained" color="primary" onClick={updateFilter}>
                    Filter
                </OrangeButton>
            )}
        </Container>
    );
};

export default Filter;
