import { Link, useMatch } from 'react-router-dom';
import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const HomeNav: React.FC = () => {
    const match = useMatch('/');

    return (
        <List>
            <ListItem button component={Link} to="/" selected={match !== null}>
                <ListItemText primary="Home" />
            </ListItem>
        </List>
    );
};

export default HomeNav;
