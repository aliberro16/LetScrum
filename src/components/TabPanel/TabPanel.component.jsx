import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { red } from "@material-ui/core/colors";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ListAltIcon from "@material-ui/icons/ListAlt";
import styled from "styled-components";
import photo from "../../assets/images/person avatar.png";
import Button from "@material-ui/core/Button";
import photo1 from "../../assets/images/myproject.JPG";
import photo2 from "../../assets/images/map.JPG"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,

    // margin: '50px',
  },
  // myheader:{
  //     width:'fit-content'
  // },

  btnContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  btnwrap: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
            // class={classes.btnContainer}
          >
            <Tabe
              icon={<PersonPinIcon />}
              aria-label="person"
              {...a11yProps(1)}
              label="Profile"
            />

            <Tabe
              icon={<AccountTreeIcon />}
              aria-label="person"
              {...a11yProps(2)}
              label="My Projects"
            />

            <Tabe
              icon={<ListAltIcon />}
              aria-label="person"
              {...a11yProps(0)}
              label="Map"
            />
          </Tabs>
        </Container>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabContainer>
          <img src={photo} alt="" />
          <Content>
            <PersInfo>
              <ul>
                <li>
                  <h1>Username:</h1>
                  <h2>Ali Berro</h2>
                </li>
                <li>
                  <h1>Email:</h1>
                  <h2>ali.berro16@hotmail.com</h2>
                </li>
                <li>
                  <h1>Phone:</h1>
                  <h2>76874009</h2>
                </li>
                <li>
                  <h1>Major:</h1>
                  <h2>front end</h2>
                </li>
              </ul>
            </PersInfo>
            <Button color="primary" variant="contained" href="">
              {" "}
              EDIT{" "}
            </Button>
          </Content>
        </TabContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContainer1>
          <img src={photo1} alt="" />
          <Content>
            <h1>You are not joined in any project !</h1>
            <BtnWraper>
            <Button color="primary" variant="contained" href="">
              {" "}
              Create Project{" "}
            </Button>
            <ButtonOrange color="secondary" variant="contained" href="">
              {" "}
              Join Project{" "}
            </ButtonOrange>
            </BtnWraper>
          </Content>
        </TabContainer1>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TabContainer2>
          <img src={photo2} alt="" />
          <Content>
            <h1>You are not joined in any project !</h1>
            <BtnWraper>
            <Button color="primary" variant="contained" href="">
              {" "}
              Create Project{" "}
            </Button>
            <ButtonOrange color="secondary" variant="contained" href="">
              {" "}
              Join Project{" "}
            </ButtonOrange>
            </BtnWraper>
          </Content>
        </TabContainer2>
      </TabPanel>
    </div>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: start;
`;

const Tabe = styled(Tab)`
  margin-left: 20px;
`;
const Content = styled.div`
  display: flex;
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
  ul {
    width: 100%;
    li {
      h1 {
        text-decoration: underline;
      }
      h2 {
        letter-spacing: 1.8px;
        color: #393e46;
      }
    }
  }
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

const BtnWraper = styled.div`
display:flex;
justify-content:space-between;
width:500px;
@media (max-width: 979px) {
   width:300px;
`;
const ButtonOrange = styled(Button)`
background-color:#ff5722;
&:hover {
  background-color:#ff5722; 
   }
`;

