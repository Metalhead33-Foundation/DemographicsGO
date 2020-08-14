import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1, 2),
    },
}));

const Home = (): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.root}>
                <Typography variant="h3">WoD Demographics</Typography>
                <p>A program to manage demographics for Ways of Darkness.</p>
            </Paper>
        </>
    );
};

export default Home;
