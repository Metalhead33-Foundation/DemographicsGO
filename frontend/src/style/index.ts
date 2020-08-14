import { makeStyles, Theme } from '@material-ui/core/styles';

export const usePaperStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export const useReceiptRowStyle = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    amount: {
        flexGrow: 0,
        width: '100px',
    },
    product: {
        flexGrow: 1,
    },
    price: {
        flexGrow: 0,
        width: '75px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    more: {
        flexShrink: 0,
        width: theme.spacing(6),
    },
}));
