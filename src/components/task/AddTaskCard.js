import React, { useState, useEffect } from "react";
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

export default function AddTaskCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [task, setTask] = useState("");
  const handleChange = (event) => {
    setTask(event.target.value);
  };

  return (
    <Carde className={classes.root}>
      <CardContent>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Add Task
        </Typography>
        <form>
          <FormInput
            type="text"
            name="Task"
            value={task.Task}
            label="Task"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name="Priority"
            value={task.Priority}
            label="Priority"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name="Time"
            value={task.Time}
            label="Time"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name="Points"
            value={task.Points}
            label="Points"
            onChange={handleChange}
          />
          <ComboBox
            label="User Story"
            variant="outlined"
            comboBoxArray={stories}
          />
          <BtnWraper>
            <Button variant="contained" color="primary">
              ADD
            </Button>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </BtnWraper>
        </form>
      </CardContent>
    </Carde>
  );
}

const stories = [{ label: "Story1" }, { label: "Story2" }, { label: "Story3" }];

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
