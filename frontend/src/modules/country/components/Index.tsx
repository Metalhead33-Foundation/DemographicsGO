import React from 'react';
import { Route, Routes } from 'react-router-dom';
import List from './List';
import Add from './Add';
import View from './View';
import Edit from './Edit';

const Index: React.FC = () => {
    return (
        <Routes>
            <Route path=":countryId/edit" element={<Edit />} />
            <Route path=":countryId/*" element={<View />} />
            <Route path="new" element={<Add />} />
            <Route path="" element={<List />} />
        </Routes>
    );
};

export default Index;
