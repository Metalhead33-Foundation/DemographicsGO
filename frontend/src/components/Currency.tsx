import React from 'react';
import NumberFormat, { NumberFormatProps, NumberFormatValues } from 'react-number-format';

interface Props extends Omit<NumberFormatProps, 'value' | 'onValueChange'> {
    value: number;
    onValueChange?: (val: number | undefined) => void;
}

const Currency: React.FC<Props> = ({ value, onValueChange, ...props }) => {
    const onValueChangeAdapter =
        onValueChange &&
        (({ floatValue }: NumberFormatValues) => onValueChange(floatValue && Math.round(floatValue * 1000)));

    return (
        <NumberFormat
            {...props}
            value={value / 1000}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale
            prefix="&euro;&nbsp;"
            onValueChange={onValueChangeAdapter}
        />
    );
};

export default Currency;
