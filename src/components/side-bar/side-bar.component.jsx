import React,{useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { Link, useParams } from 'react-router-dom';
import './side-bar.styles.scss';
import { auth, firestore } from '../../firebase/firebase.utils';
import HomeIcon from '@material-ui/icons/Home';
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
    flexContainer:{
        display:'flex'
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
        }
    },
    toolbar: {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
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
}));

const SideBar = (props, currentUser) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState();
    const {id} = useParams();
    useEffect(()=>{
        //Grab the user info from db
        firestore.collection('users')
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exists){
                //save user info
                setUser(doc.data());
            }else{
                //redirect to HomePage
            }
        })
    },[])

    console.log("user is", user);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <Divider />
                <div>
                    <List>
                        {['Home', 'Starred', 'Send email', 'Drafts'].map(
                            (text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <HomeIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            )
                        )}
                    </List>
                </div>
                <Divider />
                <div>
                    <List>
                        {user ? (
                            <ListItem button>
                                <div className='avatar'>
                                    {open ? (
                                        <Avatar className={classes.orange}>
                                            {user.displayName
                                                ? user.displayName
                                                      .charAt(0)
                                                      .toUpperCase()
                                                : ''}
                                        </Avatar>
                                    ) : (
                                        <Avatar
                                            className={`${classes.small} ${classes.orange}`}
                                        >
                                            {user.displayName
                                                ? user.displayName
                                                      .charAt(0)
                                                      .toUpperCase()
                                                : ''}
                                        </Avatar>
                                    )}
                                </div>
                            </ListItem>
                        ) : (
                            <ListItem button>
                                <div className='avatar'>
                                    {open ? (
                                        <Avatar className={classes.orange}>
                                            
                                        </Avatar>
                                    ) : (
                                        <Avatar
                                            className={`${classes.small} ${classes.orange}`}
                                        >
                                            
                                        </Avatar>
                                    )}
                                </div>
                            </ListItem>
                        )}
                        <ListItem>
                            <div className='signOut'>
                                <Link to='/' onClick={() => auth.signOut()}>
                                    Sign Out
                                </Link>
                            </div>
                        </ListItem>
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
                    <nav
                        className={
                            classes.drawerClose
                        }
                        aria-label='Mazen'
                    >
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
                <div>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Rhoncus dolor purus non enim
                            praesent elementum facilisis leo vel. Risus at
                            ultrices mi tempus imperdiet. Semper risus in
                            hendrerit gravida rutrum quisque non tellus.
                            Convallis convallis tellus id interdum velit laoreet
                            id donec ultrices. Odio morbi quis commodo odio
                            aenean sed adipiscing. Amet nisl suscipit adipiscing
                            bibendum est ultricies integer quis. Cursus euismod
                            quis viverra nibh cras. Metus vulputate eu
                            scelerisque felis imperdiet proin fermentum leo.
                            Mauris commodo quis imperdiet massa tincidunt. Cras
                            tincidunt lobortis feugiat vivamus at augue. At
                            augue eget arcu dictum varius duis at consectetur
                            lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                            donec massa sapien faucibus et molestie ac.
                        </Typography>
                        <Typography paragraph>
                            Consequat mauris nunc congue nisi vitae suscipit.
                            Fringilla est ullamcorper eget nulla facilisi etiam
                            dignissim diam. Pulvinar elementum integer enim
                            neque volutpat ac tincidunt. Ornare suspendisse sed
                            nisi lacus sed viverra tellus. Purus sit amet
                            volutpat consequat mauris. Elementum eu facilisis
                            sed odio morbi. Euismod lacinia at quis risus sed
                            vulputate odio. Morbi tincidunt ornare massa eget
                            egestas purus viverra accumsan in. In hendrerit
                            gravida rutrum quisque non tellus orci ac.
                            Pellentesque nec nam aliquam sem et tortor. Habitant
                            morbi tristique senectus et. Adipiscing elit duis
                            tristique sollicitudin nibh sit. Ornare aenean
                            euismod elementum nisi quis eleifend. Commodo
                            viverra maecenas accumsan lacus vel facilisis. Nulla
                            posuere sollicitudin aliquam ultrices sagittis orci
                            a.
                        </Typography>
                    </main>
                </div>
            </div>
        </div>
    );
};

// const mapStateToProps = (state) => ({
//     currentUser: state.user.currentUser,
// });

//export default connect(mapStateToProps)(SideBar);
export default SideBar;

