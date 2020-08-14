import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

const Nav: React.FC = () => {
    const match = useMatch('/countries/*');

    return (
        <List>
            <ListItem button component={Link} to="/countries" selected={match !== null}>
                <ListItemText primary="Countries" />
            </ListItem>
        </List>
    );
};

export default Nav;
