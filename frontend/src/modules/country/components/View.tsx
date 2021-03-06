import React from 'react';
import { usePaperStyle } from '../../../style';
import { Link, useParams } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useGetCountryQuery } from '../../../generated/apollo';
// import Brand from '../../region/components/Index';

const useStyles = makeStyles(() => ({
    title: {
        display: 'flex',
        '& > h4': {
            flexGrow: 1,
        },
    },
}));

const View: React.FC = () => {
    const classes = useStyles();

    const { countryId } = useParams();

    const paper = usePaperStyle();

    const { error, loading, data } = useGetCountryQuery({
        variables: {
            id: parseInt(countryId, 10),
        },
    });

    if (error) {
        return <Alert severity="error">{error.message}</Alert>;
    }

    if (loading || !data) {
        return <Alert severity="info">Loading...</Alert>;
    }

    return (
        <>
            <Paper className={paper.root}>
                <div className={classes.title}>
                    <Typography variant="h4">
                        <Link to="">Country: {data.country?.name}</Link>
                    </Typography>
                    <IconButton edge="end" component={Link} to={`edit`}>
                        <EditIcon />
                    </IconButton>
                </div>
            </Paper>
        </>
    );
};

export default View;
