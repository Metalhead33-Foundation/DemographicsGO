import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { CountryInput } from '../../../generated/apollo';

interface Props extends CountryInput {
    save: (props: CountryInput) => void;
    cancel: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttonGroup: {
        margin: theme.spacing(1),
    },
}));

const Form: React.FC<Props> = (props) => {
    const classes = useStyles();

    const [name, setName] = useState(props.name);

    useEffect(() => {
        setName(props.name);
    }, [props.name]);

    const { save, cancel } = props;

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField required label="Name" value={name} onChange={(ev) => setName(ev.target.value)} />
            <div className={classes.buttonGroup}>
                <Button color="primary" onClick={() => save({ name })}>
                    Save
                </Button>
                <Button color="primary" onClick={cancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default Form;
