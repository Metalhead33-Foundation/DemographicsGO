import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormLabel,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    label: string;
    plural?: string;
    values: string[];
    onChange: (newValue: string[]) => void;
}

interface DialogProps {
    open: boolean;
    value: string;
    label?: string;
    onUpdate: (value: string) => void;
    onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    addNew: {
        color: theme.palette.secondary.main,
    },
    buttonGroup: {
        margin: theme.spacing(2),
    },
}));

const ListEditDialog: React.FC<DialogProps> = (props: DialogProps) => {
    const { open, label, value, onUpdate, onClose } = props;

    const [editValue, setEditValue] = useState(value);

    useEffect(() => {
        if (open) {
            setEditValue(value);
        }
    }, [
        open, // On Open to let the state reset on appearance
        value, // On Value to let the control be controlled externally
    ]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {label}: {value}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="editor"
                    label={label}
                    value={editValue}
                    onChange={(ev) => setEditValue(ev.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onUpdate(editValue)} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ListEdit: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const { label, plural, values, onChange } = props;

    const [editIdx, setEditIdx] = useState<undefined | number>(undefined);

    const removeItem = (index: number) => {
        onChange(values.filter((_, idx) => idx !== index));
    };

    const setValue = (index: number, newValue: string) => {
        const newList = [...values];
        newList[index] = newValue;
        setEditIdx(undefined);
        onChange(newList);
    };

    const addNew = () => {
        setEditIdx(values.length);
    };

    return (
        <>
            <ListEditDialog
                open={editIdx !== undefined}
                value={(editIdx !== undefined && values[editIdx]) || ''}
                onUpdate={(value) => editIdx !== undefined && setValue(editIdx, value)}
                onClose={() => setEditIdx(undefined)}
                label={editIdx === values.length ? `Add ${label}` : `Edit ${label}`}
            />
            <Divider />
            <FormLabel>{plural || `${label}s`}</FormLabel>
            <List component="ul">
                {values.map((v, idx) => (
                    <ListItem button key={idx} onClick={() => setEditIdx(idx)}>
                        <ListItemText primary={v} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => removeItem(idx)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <div className={classes.buttonGroup}>
                <Button color="primary" onClick={addNew}>
                    Add new
                </Button>
            </div>
        </>
    );
};

export default ListEdit;
