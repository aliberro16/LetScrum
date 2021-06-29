import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import BacklogTabPanel from '../../components/product-backlog/BacklogTabPanel.component';
import styled from 'styled-components';
import img from '../../assets/images/Bg1.jpg';
import ProductBacklogNoProject from '../../components/product-backlog/ProductBacklogNOProjects.component';
import ProductBacklogContainer from '../../components/product-backlog/ProductBacklogContainer.component';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormInput from '../form-input/form-input.component';
import ComboBox from '../combo-box/ComboBox.component';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { uid } from 'uid';

const useStyles = makeStyles({
    root: {},
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
});

export default function CreateSprintCard() {
    const { id } = useParams();
    const classes = useStyles();
    const [sprintData, setSprintData] = useState({
        sprint: '',
        description: '',
        numberOfWeeks: 0,
    });
    const [memberEmail, setMemberEmail] = useState('');
    const [scrumMaster, setScrumMaster] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const sprintId = uid(16);
    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSprintData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
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
    const addSprint = async () => {
        // eslint-disable-next-line array-callback-return
        // usersId.map((userId) => {

        const userRef = firestore.collection('users');
        userRef.get().then((snapshots) => {
            snapshots.forEach((user) => {
                const projectRef = userRef.doc(user.id).collection('projects');

                projectRef.get().then((snapShots) => {
                    snapShots.forEach((doc) => {
                        // console.log(doc.id, '=>', doc.data().title);
                        projectRef
                            .doc(doc.id)
                            .collection('members')
                            .where('isScrumMaster', '==', true)
                            .where('email', '==', memberEmail)
                            .onSnapshot((snapshots) => {
                                snapshots.forEach((docc) => {
                                    // console.log(docc.data());
                                    setScrumMaster(true);
                                    docc.ref.parent.parent.get().then((dc) => {
                                        if (dc.exists) {
                                            projectRef
                                                .doc(dc.id)
                                                .collection('sprints')
                                                .doc(sprintId)
                                                .set(sprintData)
                                        }
                                    });
                                });
                            });
                    });
                });
            });
        });
    };

    const searchForTheMembersProjects = async () => {
        const userRef = firestore.collection('users');
        userRef.get().then((snapshots) => {
            snapshots.forEach((user) => {
                const projectRef = userRef.doc(user.id).collection('projects');

                projectRef.get().then((snapShots) => {
                    snapShots.forEach((doc) => {
                        projectRef
                            .doc(doc.id)
                            .collection('members')
                            .where('isScrumMaster', '==', true)
                            .where('email', '==', memberEmail)
                            .onSnapshot((snapshots) => {
                                snapshots.forEach((docc) => {
                                    setScrumMaster(true);
                                });
                            });
                    });
                });
            });
        });
    };
    // const handleButtonClick = () => {
    //     if (!loading) {
    //         setSuccess(false);
    //         setLoading(true);
    //         timer.current = window.setTimeout(() => {
    //             setSuccess(true);
    //             setLoading(false);
    //         }, 2000);
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        addSprint();
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
                window.location.href = `/work/${id}/sprint/${sprintId}/chooseTask`;
            }, 2000);
        }
    };

    useEffect(() => {
        getMemberEmail();
        searchForTheMembersProjects();
        console.log(memberEmail);
    }, [id, memberEmail]);

    return (
        <Carde className={classes.root}>
            <CardContent>
                <Typography variant='h4' color='textSecondary' gutterBottom>
                    Create Sprint
                </Typography>
                {scrumMaster ? (
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type='text'
                            name='sprint'
                            value={sprintData.sprint}
                            label='Name'
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            type='text'
                            name='description'
                            value={sprintData.description}
                            label='Description'
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            type='number'
                            name='numberOfWeeks'
                            value={sprintData.numberOfWeeks}
                            label='Number of Weeks'
                            onChange={handleChange}
                            InputProps={{
                                inputProps: {
                                    max: 10,
                                    min: 1,
                                },
                            }}
                            required
                        />
                        <BtnWraper>
                            <div style={{ position: 'relative' }}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    type='submit'
                                    disabled={loading}
                                >
                                    Create
                                </Button>
                                {loading && (
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
                                )}
                            </div>
                            <Button
                                variant='contained'
                                color='secondary'
                                size='large'
                            >
                                Cancel
                            </Button>
                        </BtnWraper>
                    </form>
                ) : (
                    <div>
                        <Alert severity='warning'>
                            <AlertTitle>Warning</AlertTitle>
                            This is a warning alert —{' '}
                            <strong>
                                Only Scrum Master can access this form!
                            </strong>
                        </Alert>
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                type='text'
                                name='sprint'
                                value={sprintData.sprint}
                                label='Name'
                                onChange={handleChange}
                                disabled
                            />
                            <FormInput
                                type='text'
                                name='description'
                                value={sprintData.description}
                                label='Description'
                                onChange={handleChange}
                                disabled
                            />
                            <FormInput
                                type='number'
                                name='numberOfWeeks'
                                value={sprintData.numberOfWeeks}
                                label='Number of Weeks'
                                onChange={handleChange}
                                InputProps={{
                                    inputProps: {
                                        max: 10,
                                        min: 1,
                                    },
                                }}
                                disabled
                            />
                            <BtnWraper>
                                {/* <Link to={`/work/${id}/sprint/chooseTask`}> */}
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    type='submit'
                                    disabled
                                >
                                    Create
                                </Button>
                                {/* <Link> */}
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    size='large'
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
    height: 100px;
`;
const Carde = styled(Card)`
    display: flex;
    flex-direction: column;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
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
