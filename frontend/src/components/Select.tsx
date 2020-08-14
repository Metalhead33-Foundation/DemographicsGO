import React, { useEffect, useRef, useState } from 'react';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { QueryHookOptions } from '@apollo/react-hooks';
import usePropState from '../utils/usePropState';
import { Alert } from '@material-ui/lab';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Fade,
    FormControl,
    Input,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    Popper,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

interface Props {
    value: number;
    onChange: (val: number) => void;
    label?: string;
    className?: string;
    onBlur?: () => void;
    required?: boolean;
    fullWidth?: boolean;
}

interface DialogProps {
    onDone: (p: { id: number }) => void;
    onClose: () => void;
    open: boolean;
}

export function createDialog<CreationInputProps, CreationOutputProps, DialogInputProps, DialogOutputProps>(
    title: string,
    createAdapter: (
        input: CreationInputProps,
    ) => React.FC<{ onDone: (p: { id: number }) => void; onClose: () => void } & DialogOutputProps>,
    dialogAdapter: (input: DialogInputProps) => DialogOutputProps,
): (input: CreationInputProps) => React.FC<DialogProps & DialogInputProps> {
    return (input) => {
        const DialogForm = createAdapter(input);

        const AddDialog: React.FC<DialogProps & DialogInputProps> = (props) => {
            const { open, onClose, onDone } = props;

            return (
                <Dialog onClose={onClose} open={open}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <DialogForm onDone={onDone} onClose={onClose} {...dialogAdapter(props)} />
                    </DialogContent>
                </Dialog>
            );
        };

        return AddDialog;
    };
}

const useUpdateInternal: <U, V extends { id: number }>(
    data: U | undefined,
    adapter: (val: U) => V[],
    nameExtractor: (val: V) => string,
    setInternalValue: (val: string) => void,
    id: number | null,
) => void = (data, adapter, nameExtractor, setInternalValue, id) =>
    useEffect(() => {
        if (!data || id === null) return;

        const storeProduct = adapter(data).find((elem) => elem.id === id);

        if (!storeProduct) return;

        setInternalValue(nameExtractor(storeProduct));
    }, [data, adapter, nameExtractor, setInternalValue, id]);

const useUpdateExternal: <U, V extends { id: number }>(
    data: U | undefined,
    adapter: (val: U) => V[],
    nameExtractor: (val: V) => string,
    internalValue: string,
    id: (val: number | null) => void,
    setSuggestions: (sug: { id: number; name: string }[]) => void,
) => void = (data, adapter, nameExtractor, internalValue, setId, setSuggestions) => {
    useEffect(() => {
        if (!data) return;

        const matches = adapter(data)
            .filter((elem) => nameExtractor(elem).startsWith(internalValue))
            .map((elem) => ({ id: elem.id, name: nameExtractor(elem) }));

        setSuggestions(matches);

        const exact = matches.find((elem) => elem.name === internalValue);

        if (exact) {
            setId(exact.id);
        } else if (matches.length === 1) {
            setId(matches[0].id);
        } else {
            setId(null);
        }
    }, [data, adapter, nameExtractor, internalValue, setId, setSuggestions]);
};

interface DialogSpawnProps {
    open: boolean;
    onDone: ({ id }: { id: number }) => void;
    onClose: () => void;
}

function createSelect<
    ExtraProps,
    ExtraArgs,
    DialogCreationProps,
    DialogProps,
    TData,
    TVariables = OperationVariables,
    TID = number
>(
    query: (opts?: QueryHookOptions<TData, TVariables>) => QueryResult<TData, TVariables>,
    queryOpts: ((props: Props & ExtraProps) => QueryHookOptions<TData, TVariables>) | undefined,
    nameExtractor: (val: ExtraArgs) => string,
    adapter: (val: TData) => (ExtraArgs & { id: number })[],
    createDialog: ((props: DialogCreationProps & Props) => React.FC<DialogProps & DialogSpawnProps>) | undefined,
    dialogProps: (props: Props & { internalValue: string }) => DialogProps,
): React.FC<Props & DialogCreationProps & ExtraProps> {
    const Select: React.FC<Props & DialogCreationProps & ExtraProps> = (props) => {
        const { error, loading, data } = query(queryOpts && queryOpts(props));

        const inputEl = useRef<HTMLElement | null>(null);

        const [showSuggestions, setShowSuggestions] = useState(false);
        const [suggestions, setSuggestions] = useState<{ id: number; name: string }[]>([]);

        const blur = () => {
            props.onBlur && props.onBlur();
            setTimeout(() => setShowSuggestions(false), 200);
        };

        const focus = () => {
            setShowSuggestions(true);
        };

        const [add, setAdd] = useState(false);
        const [id, setId] = usePropState<number | null>(props.value);

        const [internalValue, setInternalValue] = useState('');

        useUpdateInternal(data, adapter, nameExtractor, setInternalValue, id);
        useUpdateExternal(data, adapter, nameExtractor, internalValue, setId, setSuggestions);

        const { onChange } = props;

        useEffect(() => {
            id !== null && onChange(id);
        }, [id, onChange]);

        if (error) {
            return (
                <Alert className={props.className} severity="error">
                    {error.message}
                </Alert>
            );
        }

        if (loading || !data) {
            return (
                <Alert className={props.className} severity="info">
                    Loading...
                </Alert>
            );
        }

        const AddDialog = createDialog && createDialog(props);

        return (
            <div className={props.className}>
                <FormControl fullWidth={props.fullWidth}>
                    <InputLabel>
                        {props.label} ({id !== null ? id : 'unknown'})
                    </InputLabel>
                    <Input
                        ref={inputEl}
                        fullWidth={props.fullWidth}
                        required={props.required}
                        value={internalValue}
                        onChange={(ev) => setInternalValue(ev.target.value)}
                        onFocus={focus}
                        onBlur={blur}
                        endAdornment={AddDialog && id === null && <Button onClick={() => setAdd(true)}>Add</Button>}
                    />
                    <Popper
                        open={showSuggestions && suggestions.length > 1}
                        anchorEl={inputEl.current}
                        placement="bottom"
                        transition
                        style={{ zIndex: 1400 }}
                    >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={200}>
                                <Paper>
                                    <List>
                                        {suggestions.slice(0, 10).map(({ id, name }) => (
                                            <ListItem key={id} button onClick={() => setInternalValue(name)}>
                                                <ListItemText primary={name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </FormControl>
                {AddDialog && (
                    <AddDialog
                        open={add}
                        onDone={({ id }: { id: number }) => {
                            setAdd(false);
                            setId(id);
                        }}
                        onClose={() => setAdd(false)}
                        {...props}
                        {...dialogProps({ ...props, internalValue })}
                    />
                )}
            </div>
        );
    };

    return Select;
}

export default createSelect;
