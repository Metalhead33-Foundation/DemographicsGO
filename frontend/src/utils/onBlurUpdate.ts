import { useEffect, useState } from 'react';

export default function useBlurState<T>([value, setValue]: [T, (val: T) => void]): [
    T,
    T,
    (val: T) => void,
    () => void,
] {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [setInternalValue, value]);

    const onBlur = () => {
        setValue(internalValue);
    };

    return [value, internalValue, setInternalValue, onBlur];
}
