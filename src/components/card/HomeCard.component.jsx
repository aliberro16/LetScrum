import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { firestore } from '../../firebase/firebase.utils';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    btn_hover: {
        '&:hover': {
            color: '#3f51b5',
        },
    },
    titleUpper: {
        textTransform: 'uppercase',
    },
});

export default function HomeCard() {
    const classes = useStyles();
    const { id } = useParams();
    const [chosenProjectId, setChosenProjectId] = useState();
    const [chosenProjectData, setChosenProjectData] = useState({});

    const getChosenProject = async (uid) => {
        const projectRef = firestore
            .collection('users')
            .doc(uid)
            .collection('projects');

        await projectRef
            .where('isChecked', '==', true)
            .get()
            .then((snapshots) => {
                if (snapshots.size > 0) {
                    snapshots.forEach((project) => {
                        setChosenProjectId(project.id);
                        setChosenProjectData(project.data());
                    });
                } else {
                    console.log('error');
                }
            });
    };
    useEffect(() => {
        setChosenProjectData({});
        getChosenProject(id).then(() => console.log(chosenProjectId));
    }, [chosenProjectId]);
    const convertTimeStampToDate = (date) => {
        const newDate =
            date.toDate().toLocaleDateString('en-US').toString() +
            '-' +
            date.toDate().toLocaleTimeString('en-US');
        return newDate;
    };
    return (
        <Carde className={classes.root}>
            {chosenProjectData ? (
                <CardContent>
                    <Typography
                        variant='h5'
                        component='h2'
                        color='textSecondary'
                        gutterBottom
                        className={classes.titleUpper}
                    >
                        {chosenProjectData.title}
                    </Typography>
                    <Typography>Created At:</Typography>
                    <Typography className={classes.pos} color='textSecondary'>
                        {chosenProjectData.createdAt
                            ? convertTimeStampToDate(
                                  chosenProjectData.createdAt
                              )
                            : ''}
                    </Typography>
                    <Typography variant='body2' component='p'>
                        Project Key:
                        <br />
                        {chosenProjectData.key}
                    </Typography>
                </CardContent>
            ) : (
                <div></div>
            )}
            <CardActions>
                <Link to='/'>
                    <Button size='small' className={classes.btn_hover}>
                        More Detail
                    </Button>
                </Link>
            </CardActions>
        </Carde>
    );
}
const Carde = styled(Card)`
    // background-color:red !important;
    width: 200px;
    @media only screen and (max-width: 600px) {
        display: none;
    }
`;
