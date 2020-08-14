import React from 'react';
import { Typography } from '@material-ui/core';
import Form from './Form';
import { useCreateCountryMutation } from '../../../generated/apollo';
import { createAdd, createAddForm } from '../../../components/Add';

export const AddCountryForm = createAddForm(
    useCreateCountryMutation,
    ['AllCountries'],
    (_ign: unknown, { name }: { name: string }) => ({
        input: {
            name,
        },
    }),
    (input) => ({ id: input.country.id, msg: `Added new country: ${input.country.name}` }),
    ({ nameHint }: { nameHint?: string }) => ({
        name: nameHint || '',
    }),
    Form,
);

const AddCountry = createAdd(() => ({}), AddCountryForm, <Typography variant="h4">Add Country</Typography>);

export default AddCountry;
