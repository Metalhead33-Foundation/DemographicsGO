import React, { useState } from 'react';
import { usePaperStyle } from '../style';
import { Navigate, useNavigate } from 'react-router-dom';
import { MutationHookOptions, MutationTuple } from '@apollo/react-hooks';
import { Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';

interface AddFormProps {
    onDone: (val: { id: number }) => void;
    onCancel: () => void;
}

export const createAdd: <Props>(
    useGetProps: () => Props,
    AddForm: React.FC<Props & { onDone: (v: { id: number }) => void; onCancel: () => void }>,
    Header?: JSX.Element,
) => React.FC = (useGetProps, AddForm, Header) => {
    const Add: React.FC = () => {
        const props = useGetProps();

        const paper = usePaperStyle();

        const navigate = useNavigate();

        const [done, setDone] = useState<{ id: number } | null>(null);

        if (done) {
            return <Navigate to={`../${done.id}`} />;
        }

        return (
            <Paper className={paper.root}>
                {Header}
                <AddForm onDone={setDone} onCancel={() => navigate(-1)} {...props} />
            </Paper>
        );
    };

    return Add;
};

export function createAddForm<
    ExtraProps,
    ExtraInitialProps,
    InitialProps,
    FormInput,
    MutationExtra,
    TData,
    TMVariables
>(
    useCreateMutation: (opts?: MutationHookOptions<TData, TMVariables>) => MutationTuple<TData, TMVariables>,
    refetchQueries: string[],
    saveAdapter: (externalProps: ExtraProps, formInput: FormInput) => TMVariables,
    successAdapter: (input: TData) => { id: number; msg: string },
    initialProps: (externalProps: ExtraInitialProps) => InitialProps,
    Form: React.FC<InitialProps & { save: (input: FormInput) => void; cancel: () => void }>,
): React.FC<AddFormProps & ExtraProps & ExtraInitialProps> {
    const AddForm: React.FC<AddFormProps & ExtraProps & ExtraInitialProps> = (extraProps) => {
        const { onDone, onCancel } = extraProps;

        const { enqueueSnackbar } = useSnackbar();

        const [create] = useCreateMutation({
            refetchQueries,
        });

        const save = async (props: FormInput) => {
            try {
                const { data } = await create({
                    variables: saveAdapter(extraProps, props),
                });

                if (!data) return;

                const { id, msg } = successAdapter(data);

                enqueueSnackbar(msg, { variant: 'success' });
                onDone({ id });
            } catch (e) {
                enqueueSnackbar(e.message, { variant: 'error' });
            }
        };

        return <Form save={save} cancel={onCancel} {...extraProps} {...initialProps(extraProps)} />;
    };

    return AddForm;
}
