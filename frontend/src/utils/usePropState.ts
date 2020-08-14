import { useEffect, useState } from 'react';

export default function usePropState<T>(prop: T): [T, (val: T) => void] {
    const [value, setValue] = useState(prop);

    useEffect(() => {
        setValue(prop);
    }, [setValue, prop]);

    return [value, setValue];
}
