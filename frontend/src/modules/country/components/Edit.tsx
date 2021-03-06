import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { usePaperStyle } from '../../../style';
import { Alert } from '@material-ui/lab';
import { Paper, Typography } from '@material-ui/core';
import Form from './Form';
import { CountryInput, useGetCountryQuery, useUpdateCountryMutation } from '../../../generated/apollo';

const Edit = (): JSX.Element => {
    const { countryId } = useParams();

    const { enqueueSnackbar } = useSnackbar();

    const paper = usePaperStyle();

    const [done, setDone] = useState(false);

    const { error, loading, data } = useGetCountryQuery({
        variables: {
            id: parseInt(countryId, 10),
        },
    });

    const [updateProduct] = useUpdateCountryMutation({
        refetchQueries: ['AllCountries'],
    });

    const save = async ({ name }: CountryInput) => {
        try {
            const { data } = await updateProduct({
                variables: {
                    id: parseInt(countryId, 10),
                    input: {
                        name,
                    },
                },
            });

            if (!data) return;

            const { name: newName } = data.country;

            enqueueSnackbar(<>Saved country: {newName}</>, { variant: 'success' });

            setDone(true);
        } catch (e) {
            enqueueSnackbar(e.message, { variant: 'error' });
        }
    };

    if (done) {
        return <Navigate to=".." />;
    }

    if (error) {
        return <Alert severity="error">{error.message}</Alert>;
    }

    if (loading || !data) {
        return <Alert severity="info">Loading...</Alert>;
    }

    return (
        <Paper className={paper.root}>
            <Typography variant="h4">Edit country: {data.country?.name || ''}</Typography>
            <Form save={save} cancel={() => setDone(true)} name={data.country?.name || ''} />
        </Paper>
    );
};

export default Edit;
