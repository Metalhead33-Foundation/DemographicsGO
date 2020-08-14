import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    root: {
        //color: theme.palette.secondary.contrastText,
        //border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '3em',
        padding: '5px',
        backgroundColor: red['100'],
    },
}));

interface FieldProps {
    children: string;
}

const Field = ({ children }: FieldProps) => {
    const classes = useStyles();

    return <span className={classes.root}>{children}</span>;
};

interface Props {
    children: string;
}

const TemplateView: React.FC<Props> = ({ children: tpl }) => {
    return (
        <>
            {tpl.split('{{').reduce((parts: (JSX.Element | string)[], part) => {
                const [left, right] = part.split('}}');

                if (right === undefined) {
                    return [...parts, left];
                }

                return [...parts, <Field key={parts.length}>{left.slice(1)}</Field>, right];
            }, [])}
        </>
    );
};

export default TemplateView;
