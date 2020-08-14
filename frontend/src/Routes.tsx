import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './modules/home/components/Home';
import Countries from './modules/country/components/Index';

const MyRoutes = (): JSX.Element => (
    <Routes>
        <Route path="/countries/*" element={<Countries />} />
        <Route path="/*" element={<Home />} />
    </Routes>
);

export default MyRoutes;
