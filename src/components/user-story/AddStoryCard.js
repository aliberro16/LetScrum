import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormInput from "../form-input/form-input.component";
import { firestore } from "../../firebase/firebase.utils";
import { Alert, AlertTitle } from '@material-ui/lab';


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

export default function AddStoryCard() {
  const classes = useStyles();
  // const [story, setStory] = useState("");
  // const handleChange = (event) => {
  //   setStory(event.target.value);
  // };
  const [checkedId, setCheckedId] = useState("");
  const { id } = useParams();
  const [isEnabled, setEnable] = useState(false);
  const initialData = {
    story: "",
    description: "",
  };
  const [data, setData] = useState(initialData);

  const checkIfMember = async () => {
    if (checkedId) {
      firestore
        .collection("users")
        .doc(id)
        .collection("projects")
        .doc(checkedId)
        .get()
        .then((snapShot) => {
          if (snapShot.exists) {
            setEnable(true);
          } else {
            setEnable(false);
          }
        });
    }
  };

  const getTheCheckedId = () => {
    const projectRef = firestore
      .collection("users")
      .doc(id)
      .collection("projects");

    projectRef
      .where("isChecked", "==", true)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((project) => {
            //project.id
            setCheckedId(project.id);
          });
        } else {
          return;
        }
      });
  };
  useEffect(() => {
    getTheCheckedId();
    // checkIfMember(id, checkedId);
    console.log(checkedId);
  }, []);

  useEffect(() => {
    checkIfMember();
  }, [checkedId]);

  const addUserStory = async (uid, pid, dataa) => {
    try {
      const storyRef = firestore
        .collection("users")
        .doc(uid)
        .collection("projects")
        .doc(pid)
        .collection("userStories");

      await storyRef.add(dataa);
      alert("stroy added success");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserStory(id, checkedId, data);
    console.log(data);
  };

  return (
    <Carde className={classes.root}>
      <CardContent>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Add User Story
        </Typography>
        {isEnabled ? (
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="story"
              value={data.story}
              label="User Story"
              onChange={handleChange}
              required
            />
            <FormInput
              type="text"
              name="description"
              value={data.description}
              label="Description"
              onChange={handleChange}
              required
              multiline
            />
            <BtnWraper>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                ADD
              </Button>
              <Button variant="contained" color="secondary" size="large">
                Cancel
              </Button>
            </BtnWraper>
          </form>
        ) : (
          <div>
            <Alert severity="warning" >
            <AlertTitle>Warning</AlertTitle>
            This is a warning alert — <strong>Only Product Owners can access this form!</strong>
            </Alert>
            <form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="story"
                value={data.story}
                label="User Story"
                onChange={handleChange}
                required
                disabled
              />
              <FormInput
                type="text"
                name="description"
                value={data.description}
                label="Description"
                onChange={handleChange}
                required
                multiline
                disabled
              />
              <BtnWraper>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled
                >
                  ADD
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Cancel
                </Button>
              </BtnWraper>
            </form>
          </div>
        )}
      </CardContent>
    </Carde>
  );
}

const BtnWraper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
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

// <Link to={`/work/${id}/productbacklog/userStoryView`}>
