import React from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlUnstyled from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const FormControl = styled(FormControlUnstyled)`
    width: 100%;
`;

interface FormElementProps {
    title: string;
    type: string;
    defaultValue: string | number;
    onChange: Function;
    values: any[];
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
            {values.map((value: string | [string, string]) => {
                let val = '';
                let name = '';

                if (Array.isArray(value)) {
                    [name, val] = value;
                } else {
                    [name, val] = [value, value];
                }

                return (
                    <MenuItem key={val} value={val}>{name}</MenuItem>
                );
            })}
        </Select>
    </FormControl>
);

export default FilterElement;
