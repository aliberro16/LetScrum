import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import photo from "../../assets/images/checklist.svg";

function AllSprintCard() {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 30,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  return (
    <Container>
      <Carde className={classes.root}>
        <CardContent>
          <Image>
            <img src={photo} alt="" />
          </Image>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sprint 1
          </Typography>
          <Typography variant="body2" component="p">
            this is the first sprint
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Carde>
      <Carde className={classes.root}>
        <CardContent>
          <Image>
            <img src={photo} alt="" />
          </Image>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sprint 1
          </Typography>
          <Typography variant="body2" component="p">
            this is the first sprint
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Carde>
      <Carde className={classes.root}>
        <CardContent>
          <Image>
            <img src={photo} alt="" />
          </Image>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sprint 1
          </Typography>
          <Typography variant="body2" component="p">
            this is the first sprint
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Carde>
      <Carde className={classes.root}>
        <CardContent>
          <Image>
            <img src={photo} alt="" />
          </Image>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sprint 1
          </Typography>
          <Typography variant="body2" component="p">
            this is the first sprint
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Carde>
      <Carde className={classes.root}>
        <CardContent>
          <Image>
            <img src={photo} alt="" />
          </Image>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sprint 1
          </Typography>
          <Typography variant="body2" component="p">
            this is the first sprint
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Carde>
      <Carde className={classes.root}>
        <CardContent>
          <Image>
            <img src={photo} alt="" />
          </Image>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sprint 1
          </Typography>
          <Typography variant="body2" component="p">
            this is the first sprint
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Carde>
    </Container>
  );
}

export default AllSprintCard;

const Container = styled.div`
  //   width: 100%;
  display: flex;
  padding-bottom: 30px;
  flex-wrap: wrap;
`;
const Image = styled.div`
  img {
    width: 250px;
  }
`;
const Carde = styled(Card)`
  margin: 0 15px 15px 0px;
`;
