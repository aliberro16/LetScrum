import React, { useState } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import FormInput from "../form-input/form-input.component";
import { firestore } from "../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import Tab from "@material-ui/core/Tab";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
  });
  const { id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (data) {
        firestore.collection("users").doc(id).update(data);
        console.log(data);
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Profile
        </DialogTitle>
        <DialogContent dividers style={{width:'500px'}}>
          <Content>
            <PersInfo>
              <form onSubmit={handleSubmit}>
                <FormInput1
                  type="text"
                  name="displayName"
                  value={data.displayName}
                  onChange={handleChange}
                  label="Username"
                  required
                />
                <FormInput1
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  label="Email"
                  required
                />
                <FormInput1
                  type="tel"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                  label="Phone Number"
                  required
                />
                <DialogActions>
                  <Button
                    autoFocus
                    // onClick={handleClose}
                    type="submit"
                    color="primary"
                  >
                    Save changes
                  </Button>
                </DialogActions>
              </form>
            </PersInfo>
          </Content>
        </DialogContent>
      </Dialog>
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
  width: 100%;
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
  width: 70%;
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
  justify-content: flex-end;
  @media (max-width: 979px) {
    width: 300px;
    justify-content: center;
  }
`;

const FormInput1 = styled(FormInput)`
  ${"" /* width: 30%; */}
`;
