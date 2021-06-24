import React, { useState, useEffect } from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import BacklogTabPanel from "../../components/product-backlog/BacklogTabPanel.component";
import styled from "styled-components";
import img from "../../assets/images/Bg1.jpg";
import ProductBacklogNoProject from "../../components/product-backlog/ProductBacklogNOProjects.component";
import ProductBacklogContainer from "../../components/product-backlog/ProductBacklogContainer.component";
import Button from "@material-ui/core/Button";
import { Link,useParams } from "react-router-dom";
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

export default function CreateSprintCard() {
  const { id } = useParams();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [sprint, setSprint] = useState("");
  const handleChange = (event) => {
    setSprint(event.target.value);
  };

  return (
    <Carde className={classes.root}>
      <CardContent>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Create Sprint
        </Typography>
        <form>
          <FormInput
            type="text"
            name="name"
            value={sprint.Name}
            label="Name"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name="Description"
            value={sprint.Description}
            label="Description"
            onChange={handleChange}
          />
          <FormInput
            type="number"
            name="WeeksNumber"
            value={sprint.WeeksNumber}
            label="Number of Weeks"
            onChange={handleChange}
          />
          <BtnWraper>
          <Link to = {`/work/${id}/sprint/chooseTask`}>
            <Button variant="contained" color="primary" size="large">
              Create
            </Button>
          </Link>
            <Button variant="contained" color="secondary" size="large">
              Cancel
            </Button>
          </BtnWraper>
        </form>
      </CardContent>
    </Carde>
  );
}
const BtnWraper = styled.div`
  display: flex;
  justify-content: flex-end;
  ${'' /* margin-right: 18px; */}
  height: 100px;
  Button {
    ${'' /* height: 60px; */}
    ${'' /* width: fit-content; */}
    ${'' /* font-size: 30px !important; */}
  }
`;
const Carde = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 80%;
  ${"" /* justify-content:center; */}
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius:4px;
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
