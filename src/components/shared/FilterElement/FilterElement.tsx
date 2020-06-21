import React from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlUnstyled from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const FormControl = styled(FormControlUnstyled)`
    width: ${({ theme }) => theme.grid(48)};
`;

interface FormElementProps {
    title: string;
    type: string;
    defaultValue: string | number;
    onChange: Function;
    values: string[];
}

const FilterElement: React.FC<FormElementProps> = ({
    title,
    type,
    defaultValue,
    onChange,
    values,
}) => (
    <FormControl variant="filled">
        <InputLabel>{title}</InputLabel>
        <Select
            value={defaultValue}
            onChange={(e: any) => onChange(type, e.target.value)}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {values.map((value: string) => (
                <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default FilterElement;
