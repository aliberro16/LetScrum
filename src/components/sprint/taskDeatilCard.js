import React, { useEffect } from 'react';
import SideBar from '../../components/side-bar/side-bar.component';
import BacklogTabPanel from '../../components/product-backlog/BacklogTabPanel.component';
import styled from 'styled-components';
import img from '../../assets/images/Bg1.jpg';
import Button from '@material-ui/core/Button';
import { Link, useLocation, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import photo from '../../assets/images/detailStory.svg';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function TaskDetailCard() {
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
    });
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
    const { id } = useParams();
    const { sprintId } = useParams();
    const { taskId } = useParams();
    let location = useLocation();
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(50);
        });

        return () => {
            clearInterval(timer);
        };
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Container>
            <StoryInfo>
                <h1> Task Details:</h1>
                <InfoContainer>
                    <h2>Task:&nbsp;</h2>
                    <span>{capitalizeFirstLetter(location.task.t.task)}</span>
                </InfoContainer>
                <InfoContainer>
                    <h2>User Story:&nbsp; </h2>
                    <span>{capitalizeFirstLetter(location.task.t.story)}</span>
                </InfoContainer>
                <InfoContainer>
                    <h2>Time:&nbsp; </h2>
                    <span>{location.task.t.time} hours</span>
                </InfoContainer>
                <InfoContainer>
                    <h2>User:&nbsp; </h2>
                    <span>{location.task.t.member}</span>
                </InfoContainer>
                <InfoContainer>
                    <h2>Progress:&nbsp; </h2>
                    <div className={classes.root}>
                        <LinearProgress
                            variant='determinate'
                            value={location.task.t.progress}
                        />
                    </div>
                </InfoContainer>
                <BtnWraper>
                    <Link
                        to={{pathname:`/work/${id}/sprint/${sprintId}/editTask/${taskId}`,taskk:location.task.t}}
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            size='medium'
                        >
                            Edit
                        </Button>
                    </Link>
                </BtnWraper>
            </StoryInfo>
            <Image>
                <img src={photo} alt='' />
            </Image>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media only screen and (max-width: 600px) {
        diplay: flex;
        justify-content: flex-start;
    }
`;
const Image = styled.div`
    img {
        margin: 0 100px;
        width: 500px;
        height: 500px;
    }
    @media only screen and (max-width: 600px) {
        display: none;
    }
    @media only screen and (max-width: 1200px) {
        display: none;
    }
`;

const TaskList = styled.div`
    width: fit-content;
    li {
        color: #3f51b5;
    }
    :hover {
        cursor: pointer;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
        font-size: 18px;
    }
`;

const StoryInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    h1 {
        margin-bottom: 15px;
    }
    @media only screen and (max-width: 600px) {
        margin-left: 0px;
    }
`;
const BtnWraper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 25px;
`;
