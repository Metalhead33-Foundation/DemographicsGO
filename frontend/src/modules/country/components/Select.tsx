import React from 'react';
import { Country, useAllCountriesQuery } from '../../../generated/apollo';
import { DialogContent, DialogTitle } from '@material-ui/core';
import createSelect from '../../../components/Select';
import Dialog from '@material-ui/core/Dialog';
import { AddCountryForm } from './Add';

interface DialogProps {
    open: boolean;
    onDone: ({ id }: { id: number }) => void;
    onClose: () => void;
    nameHint: string;
}

const createDialog: () => React.FC<DialogProps> = () => {
    const AddCountryDialog: React.FC<DialogProps> = ({ open, onDone, onClose, nameHint }) => {
        return (
            <Dialog onClose={onClose} open={open}>
                <DialogTitle>Add country</DialogTitle>
                <DialogContent>
                    <AddCountryForm nameHint={nameHint} onDone={onDone} onCancel={onClose} />
                </DialogContent>
            </Dialog>
        );
    };

    return AddCountryDialog;
};

const SelectCountry = createSelect(
    useAllCountriesQuery,
    undefined,
    ({ name }: { name: string }) => name,
    ({ countries }: { countries: Country[] }) => countries,
    createDialog,
    ({ internalValue }: { internalValue: string }) => ({ nameHint: internalValue }),
);

export default SelectCountry;
