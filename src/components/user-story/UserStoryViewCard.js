import React from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import BacklogTabPanel from "../../components/product-backlog/BacklogTabPanel.component";
import styled from "styled-components";
import img from "../../assets/images/Bg1.jpg";
import ProductBacklogNoProject from "../../components/product-backlog/ProductBacklogNOProjects.component";
import ProductBacklogContainer from "../../components/product-backlog/ProductBacklogContainer.component";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormInput from "../form-input/form-input.component";
import ComboBox from "../combo-box/ComboBox.component";

const useStyles = makeStyles({
  root: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function UserStoryViewCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Link to="/work/:id/productbacklog/StoryDetail">
        <Carde className={classes.root}>
          <CardContent>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              User Story title
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              N Tasks
            </Typography>
          </CardContent>
        </Carde>
      </Link>
      <Carde className={classes.root}>
        <CardContent>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            User Story title
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            N Tasks
          </Typography>
        </CardContent>
      </Carde>
    </div>
  );
}

const BtnWraper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 18px;
  height: 100px;
  Button {
    height: 60px;
    width: fit-content;
    font-size: 30px !important;
  }
`;
const Carde = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px !important;
  :hover {
    border-left: 5px solid #ff5722;
    cursor: pointer;
  }

  @media only screen and (max-width: 1200px) {
    display: flex;
    width: 700px;
    justify-content: flex-start;
  }
  @media only screen and (max-width: 600px) {
    display: flex;
    width: 445px;
    justify-content: flex-start;
  }
`;
