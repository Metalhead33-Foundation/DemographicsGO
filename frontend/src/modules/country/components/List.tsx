import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    IconButton,
    List as MuiList,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Alert } from '@material-ui/lab';
import { useAllCountriesQuery, useDeleteCountryMutation } from '../../../generated/apollo';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

const List: React.FC = () => {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    /* Data fetching */
    const { loading, error, data } = useAllCountriesQuery();

    /* Data deletion */
    const [deleteStore] = useDeleteCountryMutation({
        refetchQueries: ['AllCountries'],
    });

    const removeItem = async (id: number) => {
        try {
            const { data } = await deleteStore({
                variables: {
                    id,
                },
            });

            if (!data || !data.deleted) return;

            enqueueSnackbar(<>Deleted country {id}</>, { variant: 'success' });
        } catch (e) {
            enqueueSnackbar(e.message, { variant: 'error' });
        }
    };

    if (error) {
        return <Alert severity="error">{error.message}</Alert>;
    }

    if (loading || !data) {
        return <Alert severity="info">Loading...</Alert>;
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h4">Countries</Typography>
            <MuiList component="nav" aria-label="stores">
                {data.countries.map(({ id, name }) => (
                    <ListItem button key={id} component={Link} to={`${id}`}>
                        <ListItemText primary={name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" component={Link} to={`${id}/edit`}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => removeItem(id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </MuiList>
            <Button color="primary" component={Link} to="new">
                Add new
            </Button>
        </Paper>
    );
};

export default List;
