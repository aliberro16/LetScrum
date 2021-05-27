import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { Link, useParams } from 'react-router-dom';
import { auth, firestore } from '../../firebase/firebase.utils';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import AddIcon from '@material-ui/icons/Add';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MenuIcon from '@material-ui/icons/Menu';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import RoomServiceIcon from '@material-ui/icons/RoomService';

import ProductBackLogIcon from '../../assets/icons/backlog.svg';
import SprintIcon from '../../assets/icons/sprint.svg';
import JoinIcon from '../../assets/icons/join.svg';
// import ImgSlider from '../../components/image-slider/image-slider.component';
import './side-bar.styles.scss';
import About from '../../assets/images/About.jpg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    flexContainer: {
        display: 'flex',
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            marginRight: theme.spacing(2),
        },
    },

    hide: {
        display: 'none',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 0,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        marginTop: '64px',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        [theme.breakpoints.down('xs')]: {
            width: 0,
        },
    },
    toolbar: {
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    imgContainer: {
        backgroundColor: 'red',
        // height:'100%',
        // width:'100%',
        position: 'relative',
        img: {
            position: 'absolute',
            height: '100%',
            width: '100%',
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    avatar: {
        textAlign: 'center',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        fontSize: '12px',
    },
    nested: {
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(2),
    },
    newSize: {
        width: '56px',
        height: '48px',
    },
    iconSize: {
        width: '24px',
        height: '24px',
    },
    menuPadding: {
        marginTop: '30px',
        marginLeft: '25px',
    },
    blackLink: {
        color: 'black',
    },
}));

const SideBar = (props) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState();
    const [expand, setExpand] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const opened = Boolean(anchorEl);
    const { id } = useParams();

    useEffect(() => {
        //Grab the user info from db
        firestore
            .collection('users')
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    //save user info
                    setUser(doc.data());
                } else {
                    //redirect to HomePage
                }
            });
    }, []);

    // console.log('user is', user);

    const handleSubMenuToggle = () => {
        setExpand(!expand);
    };

    const handleDrawerToggle = () => {
        if (!open) {
            setExpand(true);
        } else {
            setExpand(false);
        }
        // console.log('open? ',!open);
        // console.log('expand? ',expand);

        setOpen(!open);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    var displaySubMenuIcons = (text) => {
        if (text.includes('Create')) {
            return <AddIcon />;
        } else if (text.includes('Join')) {
            return (
                <img
                    src={JoinIcon}
                    alt='join project icon'
                    className={classes.iconSize}
                />
            );
        } else if (text.includes('Choose')) {
            return <FolderIcon />;
        } else if (text.includes('Waiting')) {
            return <HourglassFullIcon />;
        } else {
            return <RoomServiceIcon />;
        }
    };

    const subListItems = [
        'Create project',
        'Join project',
        'Choose project',
        'Waiting room',
        'Pending request',
    ];
    const container =
        window !== undefined ? () => window().document.body : undefined;

    const profileMenu = (
        <Menu
            id='fade-menu'
            anchorEl={anchorEl}
            keepMounted
            open={opened}
            onClose={handleClose}
            TransitionComponent={Fade}
            className={classes.menuPadding}
        >
            <Link to={`/work/${id}/profile`} className={classes.blackLink}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <Link to='/' className={classes.blackLink}>
                <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
            </Link>
        </Menu>
    );
    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <Divider />
                <div>
                    <List aria-labelledby='nested-list-subheader'>
                        <Link
                            to={`/work/${id}/home`}
                            className={classes.blackLink}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary='Home' />
                            </ListItem>
                        </Link>
                        <Link
                            to={`/work/${id}/productbacklog`}
                            className={classes.blackLink}
                        >
                            <ListItem button className={classes.newSize}>
                                <ListItemIcon>
                                    <img
                                        src={ProductBackLogIcon}
                                        alt='product backlog icon'
                                        className={classes.iconSize}
                                    />
                                </ListItemIcon>
                                <ListItemText primary='Product Backlog' />
                            </ListItem>
                        </Link>
                        <Link
                            to={`/work/${id}/sprints`}
                            className={classes.blackLink}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <img
                                        src={SprintIcon}
                                        alt='product backlog icon'
                                        className={classes.iconSize}
                                    />
                                </ListItemIcon>
                                <ListItemText primary='Sprints' />
                            </ListItem>
                        </Link>
                        <ListItem button>
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary='Charts' />
                        </ListItem>
                        <ListItem button onClick={handleSubMenuToggle}>
                            <ListItemIcon>
                                <AccountTreeIcon />
                            </ListItemIcon>
                            <ListItemText primary='Projects' />
                            {expand ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={expand} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                {subListItems.map((item) => (
                                    <ListItem
                                        button
                                        className={classes.nested}
                                        key={item}
                                    >
                                        <ListItemIcon>
                                            {displaySubMenuIcons(item)}
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </div>
                <Divider />
                <div>
                    <List>
                        {user ? (
                            <ListItem button>
                                <div className='avatar'>
                                    {open ? (
                                        <div>
                                            <Avatar
                                                className={classes.orange}
                                                onClick={handleClick}
                                            >
                                                {user.displayName
                                                    ? user.displayName
                                                          .charAt(0)
                                                          .toUpperCase()
                                                    : ''}
                                            </Avatar>
                                            {profileMenu}
                                        </div>
                                    ) : (
                                        <div>
                                            <Avatar
                                                className={`${classes.small} ${classes.orange}`}
                                                onClick={handleClick}
                                            >
                                                {user.displayName
                                                    ? user.displayName
                                                          .charAt(0)
                                                          .toUpperCase()
                                                    : ''}
                                            </Avatar>
                                            {profileMenu}
                                        </div>
                                    )}
                                </div>
                            </ListItem>
                        ) : (
                            <ListItem button>
                                <div className='avatar'>
                                    {open ? (
                                        <div>
                                            <Avatar
                                                className={classes.orange}
                                                onClick={handleClick}
                                            ></Avatar>
                                            {profileMenu}
                                        </div>
                                    ) : (
                                        <div>
                                            <Avatar
                                                className={`${classes.small} ${classes.orange}`}
                                                onClick={handleClick}
                                            ></Avatar>
                                            {profileMenu}
                                        </div>
                                    )}
                                </div>
                            </ListItem>
                        )}
                    </List>
                </div>
            </div>
        </div>
    );
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        className={!open ? classes.menuButton : classes.hide}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.flexContainer}>
                <div>
                    <nav className={classes.drawerClose} aria-label='Mazen'>
                        <Hidden smUp implementation='css'>
                            <Drawer
                                container={container}
                                variant='temporary'
                                anchor={
                                    theme.direction === 'rtl' ? 'right' : 'left'
                                }
                                open={open}
                                onClose={handleDrawerToggle}
                                className={clsx(classes.drawer, {
                                    [classes.drawerOpen]: open,
                                    [classes.drawerClose]: !open,
                                })}
                                classes={{
                                    paper: clsx({
                                        [classes.drawerOpen]: open,
                                        [classes.drawerClose]: !open,
                                    }),
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation='css'>
                            <Drawer
                                classes={{
                                    paper: classes.drawerClose,
                                }}
                                variant='permanent'
                                // open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                 
                </div>
            </div>
        </div>
    );
};

export default SideBar;
