import React from 'react';
import { Divider } from '@material-ui/core';
import HomeNav from '../modules/home/HomeNav';
import CountryNav from '../modules/country/Nav';

const SideBar: React.FC = () => {
    return (
        <>
            <HomeNav />
            <CountryNav />
            <Divider />
        </>
    );
};

export default SideBar;
