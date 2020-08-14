import { Refresh as RefreshIcon } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import React, { useContext } from 'react';

interface ScanButtonContextProps {
    registerListener: (callback: () => void) => void;
    press: () => void;
}

export const setupContext = (): ScanButtonContextProps => {
    let callbacks: (() => void)[] = [];

    return {
        registerListener: (callback: () => void): void => {
            callbacks = [...callbacks, callback];
        },
        press: () => {
            callbacks.forEach((cb) => cb());
        },
    };
};

const useScanButton = () => useContext(ScanButtonContext);
export const useWrapQuery: <T extends { refetch: () => void }>(input: T) => T = (props) => {
    const { registerListener } = useScanButton();
    const { refetch } = props;

    registerListener(refetch);

    return props;
};

export const ScanButtonContext = React.createContext(setupContext());

const ScanButton: React.FC = () => {
    const { press } = useScanButton();

    return (
        <IconButton edge="end" onClick={press} color="inherit">
            <RefreshIcon />
        </IconButton>
    );
};

export default ScanButton;
