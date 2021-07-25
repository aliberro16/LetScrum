import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import photo from '../../assets/images/checklist.svg';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import './sprints.styles.scss';

function AllSprintCard() {
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
            fontSize: 30,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();
    const { id } = useParams();
    const [sprints, setSprints] = useState([]);
    const [memberEmail, setMemberEmail] = useState('');

    const getMemberEmail = async () => {
        await firestore
            .collection('users')
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setMemberEmail(doc.data().email);
                }
            });
    };

    const getSprints = () => {
        const userRef = firestore.collection('users');
        userRef.get().then((snapshots) => {
            snapshots.forEach((user) => {
                const projectRef = userRef.doc(user.id).collection('projects');

                projectRef.get().then((snapShots) => {
                    snapShots.forEach((doc) => {
                        projectRef
                            .doc(doc.id)
                            .collection('members')
                            .where('email', '==', memberEmail)
                            .onSnapshot((snapshots) => {
                                snapshots.forEach((docc) => {
                                    docc.ref.parent.parent.get().then((dc) => {
                                        if (dc.exists) {
                                            projectRef
                                                .doc(dc.id)
                                                .collection('sprints')
                                                .get()
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach(
                                                        (d) => {
                                                            // doc.data() is never undefined for query doc snapshots
                                                            var sId = {id:d.id}
                                                            var finalSprint = {...sId, ...d.data()}
                                                            setSprints(
                                                                (prev) => [
                                                                    ...prev,
                                                                   finalSprint,
                                                                ]
                                                            );
                                                        }
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.log(
                                                        'Error getting document:',
                                                        error
                                                    );
                                                });
                                        }
                                    });
                                });
                            });
                    });
                });
            });
        });
    };
    useEffect(() => {
        getMemberEmail();
        getSprints();
        return () => setSprints([]);
    }, [id, memberEmail]);

    useEffect(() => {
        console.log(sprints);
    }, [sprints]);
    return (
        <Container>
            {sprints.length !== 0 ? (
                sprints.map((sprint, index) => (
                    <Carde className={classes.root} key={index}>
                        <CardContent className='card-body'>
                            <Image>
                                <img src={photo} alt='' />
                            </Image>
                            <Typography
                                className={classes.title}
                                color='textSecondary'
                                gutterBottom
                            >
                                {sprint.sprint}
                            </Typography>
                            <Typography variant='body2' component='p'>
                                {sprint.description}
                            </Typography>
                        </CardContent>
                        <CardActions className='actions'>
                            <Link to={`/work/${id}/sprint/${sprint.id}/sprintbacklog`}>
                                <Button
                                    size='small'
                                   className='info-btn'
                                >
                                    Sprint Info
                                </Button>
                            </Link>
                        </CardActions>
                    </Carde>
                ))
            ) : (
                <div>
                    <CircularProgress
                        size={24}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -40,
                            marginLeft: 0,
                            color: 'green',
                        }}
                    />
                </div>
            )}
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
    display: flex;
    flex-direction: column;
    flex-basis: 31%;
    height: 350px;
`;
