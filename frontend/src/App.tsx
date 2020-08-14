import React from 'react';
import './App.css';
import clsx from 'clsx';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {
    AppBar,
    Container,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Routes from './Routes';
import SideBar from './components/SideBar';
import { SnackbarProvider } from 'notistack';
import ScanButton, { ScanButtonContext, setupContext } from './components/ScanButton';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import usePropState from './utils/usePropState';
import Version from './components/Version';

const client = new ApolloClient();

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: 'flex',
        flexFlow: 'column nowrap',
        maxHeight: '100vh',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        backgroundColor: theme.palette.background.default,
        '& h4 > a': {
            textDecoration: 'none',
            color: theme.palette.primary.main,
        },
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    contentRoot: {
        marginTop: -theme.spacing(3),
        '& > div': {
            marginTop: theme.spacing(3),
        },
    },
}));

const App: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const wideScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const [open, setOpen] = usePropState(wideScreen);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <ApolloProvider client={client}>
            <ScanButtonContext.Provider value={setupContext()}>
                <SnackbarProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <BrowserRouter>
                            <div className={classes.root}>
                                <CssBaseline />
                                <AppBar position="fixed" className={classes.appBar}>
                                    <Toolbar>
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={handleDrawerToggle}
                                            edge="start"
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography variant="h6" noWrap>
                                            WoD Demographics Editor <Version />
                                        </Typography>
                                        <div className={classes.grow} />
                                        <ScanButton />
                                    </Toolbar>
                                </AppBar>
                                <Drawer
                                    className={classes.drawer}
                                    variant="persistent"
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    open={open}
                                    anchor="left"
                                >
                                    <div className={classes.toolbar} />
                                    <Divider />
                                    <SideBar />
                                    <Divider />
                                </Drawer>
                                <main
                                    className={clsx(classes.content, {
                                        [classes.contentShift]: open,
                                    })}
                                >
                                    <div className={classes.toolbar} />
                                    <Container maxWidth="md" className={classes.contentRoot}>
                                        <Routes />
                                    </Container>
                                </main>
                            </div>
                        </BrowserRouter>
                    </MuiPickersUtilsProvider>
                </SnackbarProvider>
            </ScanButtonContext.Provider>
        </ApolloProvider>
    );
};

export default App;
