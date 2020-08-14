import React from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { TextField } from '@material-ui/core';

interface Props {
    value: number;
    onChange: (val: number) => void;
    onBlur?: () => void;
    unit: { suffix: string; divisor: number };
    freeAmount: boolean;
    label?: string;
    className?: string;
    required?: boolean;
}

const AmountField: React.FC<Props> = ({ value, required, className, onChange, onBlur, unit, freeAmount, label }) => {
    const updateValue = ({ floatValue }: NumberFormatValues) => {
        if (!floatValue) return;

        if (freeAmount) {
            onChange(floatValue * unit.divisor);
        } else {
            onChange(floatValue);
        }
    };

    return (
        <NumberFormat
            customInput={TextField}
            required={required}
            className={className}
            value={value / (freeAmount ? unit.divisor : 1)}
            onValueChange={updateValue}
            suffix={freeAmount ? `\u00A0${unit.suffix}` : undefined}
            label={label}
            onBlur={onBlur}
        />
    );
};

export default AmountField;
