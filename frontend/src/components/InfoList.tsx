import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        '& > dt': {
            fontWeight: 600,
            width: '20%',
            display: 'inline-block',
            background: theme.palette.grey[200],
            padding: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        '& > dd': {
            width: '79%',
            margin: 0,
            display: 'inline-block',
            background: theme.palette.grey[100],
            padding: theme.spacing(1),
        },
        '& > dd:empty::before': {
            content: '"-"',
        },
    },
}));

export const InfoList: React.FC = ({ children }) => {
    const classes = useStyles();

    return <dl className={classes.list}>{children}</dl>;
};
