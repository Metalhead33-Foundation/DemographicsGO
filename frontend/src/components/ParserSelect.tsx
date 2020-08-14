import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

interface Props {
    label?: string;
    value: 'tv' | 'epi';
    onChange: (value: 'tv' | 'epi') => void;
    required?: boolean;
}

const ParserSelect: React.FC<Props> = ({ label, value, onChange, required }: Props) => {
    const updateValue = (ev: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        onChange(ev.target.value as 'tv' | 'epi');
    };

    return (
        <FormControl>
            {label && <InputLabel required={required}>{label}</InputLabel>}
            <Select value={value} onChange={updateValue}>
                <MenuItem value="tv">TV Parser</MenuItem>
                <MenuItem value="epi">Epi Parser</MenuItem>
            </Select>
        </FormControl>
    );
};

export default ParserSelect;
