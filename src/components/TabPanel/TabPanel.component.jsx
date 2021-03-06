import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useParams } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ListAltIcon from '@material-ui/icons/ListAlt';
import styled from 'styled-components';
import photo from '../../assets/images/person avatar.png';
import Button from '@material-ui/core/Button';
import photo1 from '../../assets/images/myproject.JPG';
import photo2 from '../../assets/images/map.JPG';
import FormInput from '../form-input/form-input.component';
import { firestore } from '../../firebase/firebase.utils';
import Dialog from '../../components/dialog/CustomizedDialogs';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,

        // margin: '50px',
    },
    // myheader:{
    //     width:'fit-content'
    // },

    btnContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    btnwrap: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function ScrollableTabsButtonPrevent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { id } = useParams();

    const [data, setData] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  const [user, setUser] = useState();
  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
    });

    return (
        <div className={classes.root}>
            {user ? (
                <>
                    <AppBar position='static'>
                        <Container>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant='scrollable'
                                scrollButtons='off'
                                aria-label='scrollable prevent tabs example'
                                // class={classes.btnContainer}
                            >
                                <Tabe
                                    icon={<PersonPinIcon />}
                                    aria-label='person'
                                    {...a11yProps(1)}
                                    label='Profile'
                                />

                                <Tabe
                                    icon={<AccountTreeIcon />}
                                    aria-label='person'
                                    {...a11yProps(2)}
                                    label='My Projects'
                                />

                                <Tabe
                                    icon={<ListAltIcon />}
                                    aria-label='person'
                                    {...a11yProps(0)}
                                    label='Map'
                                />
                            </Tabs>
                        </Container>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <TabContainer>
                            <img src={photo} alt='' />

                            <Content>
                                <PersInfo>
                                    <FormInput1
                                        type='text'
                                        name='displayName'
                                        value={user.displayName}
                                        label='Username'
                                        disabled
                                    />
                                    <FormInput1
                                        type='email'
                                        name='email'
                                        value={user.email}
                                        label='Email'
                                        disabled
                                    />
                                    <FormInput1
                                        type='tel'
                                        name='phoneNumber'
                                        value={user.phoneNumber}
                                        label='Phone Number'
                                        disabled
                                    />
                                </PersInfo>
                                <BtnWraper1>
                                    <Dialog
                                        onClose={handleClose}
                                        aria-labelledby='customized-dialog-title'
                                        open={open}
                                    ></Dialog>
                                </BtnWraper1>
                            </Content>
                        </TabContainer>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TabContainer1>
                            <img src={photo1} alt='' />
                            <Content>
                                <h1>You are not joined in any project !</h1>
                                <BtnWraper>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        href=''
                                    >
                                        {' '}
                                        Create Project{' '}
                                    </Button>
                                    <ButtonOrange
                                        color=''
                                        variant='contained'
                                        href=''
                                    >
                                        {' '}
                                        Join Project{' '}
                                    </ButtonOrange>
                                </BtnWraper>
                            </Content>
                        </TabContainer1>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TabContainer2>
                            <img src={photo2} alt='' />
                            <Content>
                                <h1>You are not joined in any project !</h1>
                                <BtnWraper>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        href=''
                                    >
                                        {' '}
                                        Create Project{' '}
                                    </Button>
                                    <ButtonOrange variant='contained' href=''>
                                        {' '}
                                        Join Project{' '}
                                    </ButtonOrange>
                                </BtnWraper>
                            </Content>
                        </TabContainer2>
                    </TabPanel>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
}
const ButtonOrange = styled(Button)`
    background-color: #ff5722;
    color: white;
    &:hover {
        background-color: #ff5722;
    }
`;
const Container = styled.div`
    display: flex;
    justify-content: start;
`;

const Tabe = styled(Tab)`
    margin-left: 20px;
`;
const Content = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
`;

const TabContainer = styled.div`
max-width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
    img{
    height: auto;
    width:400px
    }
    @media (max-width: 979px) {
    img { 
        display: none;
    }
  }
}
`;
const PersInfo = styled.div`
    width: 55%;
    @media (max-width: 979px) {
        min-width: 250px;
    }
`;
const TabContainer2 = styled(TabContainer)`
display:flex;
flex-direction: row-reverse;
  img {
    width: 500px;
  }
  @media (max-width: 979px) {
    img { 
        display: none;
    }
`;
const TabContainer1 = styled(TabContainer)`
display:flex;
flex-direction: row-reverse;
  img {
    width: 600px;
  }
  @media (max-width: 979px) {
    img { 
        display: none;
    }
`;

const BtnWraper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 500px;
    @media (max-width: 979px) {
        width: 300px;
    }
`;
const BtnWraper1 = styled(BtnWraper)`
    display: flex;
    justify-content: flex-end;
    @media (max-width: 979px) {
        width: 300px;
        justify-content: center;
    }
`;

const FormInput1 = styled(FormInput)`
    ${'' /* width: 30%; */}
`;
