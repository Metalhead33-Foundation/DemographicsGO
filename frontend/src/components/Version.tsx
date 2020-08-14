import React from 'react';
import { useGetVersionQuery } from '../generated/apollo';

const Version: React.FC = () => {
    const { error, loading, data } = useGetVersionQuery();

    if (error) {
        return <>{error.message}</>;
    }

    if (loading || !data) {
        return <>Loading...</>;
    }

    return <>{data.version}</>;
};

export default Version;
