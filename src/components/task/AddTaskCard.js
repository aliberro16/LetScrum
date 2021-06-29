import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormInput from '../form-input/form-input.component';
import ComboBox from '../combo-box/ComboBox.component';
import { Alert, AlertTitle } from '@material-ui/lab';

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

export default function AddTaskCard() {
    const classes = useStyles();
    const [scrumMaster, setScrumMaster] = useState(false);
    const [task, setTask] = useState({
        task: '',
        priority: 0,
        time: 0,
        progress:0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const { id } = useParams();
    const [memberEmail, setMemberEmail] = useState('');
    const [storyData, setStoryData] = useState([
        { story: '', description: '' },
    ]);
    const options = storyData.map((story) => story.story);
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    const onInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    const handleComboChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
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

        const searchForTheMembersProjects = async () => {
            // eslint-disable-next-line array-callback-return
            // usersId.map((userId) => {

            const userRef = firestore.collection('users');
            userRef.get().then((snapshots) => {
                snapshots.forEach((user) => {
                    const projectRef = userRef
                        .doc(user.id)
                        .collection('projects');

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
                                        console.log(docc.data());
                                        setScrumMaster(true);
                                        docc.ref.parent.parent
                                            .get()
                                            .then((dc) => {
                                                if (dc.exists) {
                                                    console.log(dc.data());
                                                    projectRef
                                                        .doc(dc.id)
                                                        .collection(
                                                            'userStories'
                                                        )
                                                        .orderBy('story', 'asc')
                                                        .get()
                                                        .then((storyDocs) => {
                                                            storyDocs.forEach(
                                                                (userDoc) => {
                                                                    setStoryData(
                                                                        (
                                                                            prevData
                                                                        ) => [
                                                                            ...prevData,
                                                                            userDoc.data(),
                                                                        ]
                                                                    );
                                                                }
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

        getMemberEmail().then(() => searchForTheMembersProjects());

        return () => setStoryData([{ story: '', description: '' }]); // use cleanup to toggle value, if unmounted
    }, [id, memberEmail]);

    useEffect(() => {
        console.log(inputValue);
    }, [inputValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask();
        setTask({
            task: '',
            priority: 0,
            time: 0,
        });
    };
    const addTask = async () => {
        const userRef = firestore.collection('users');
        userRef.get().then((snapshots) => {
            snapshots.forEach((user) => {
                const projectRef = userRef.doc(user.id).collection('projects');

                projectRef.get().then((snapShots) => {
                    snapShots.forEach((doc) => {
                        // console.log(doc.id, '=>', doc.data().title);
                        var userStoryRef = projectRef
                            .doc(doc.id)
                            .collection('userStories');
                        userStoryRef
                            .where('story', '==', inputValue)
                            .get()
                            .then((querySnapShots) => {
                                querySnapShots.forEach((storyDoc) => {
                                    userStoryRef
                                        .doc(storyDoc.id)
                                        .collection('tasks')
                                        .add(task);
                                    alert(
                                        `Done adding ${task.task} to ${inputValue}`
                                    );
                                });
                            });
                    });
                });
            });
        });
    };

    return (
        <>
            {storyData.length > 0 ? (
                <Carde className={classes.root}>
                    <CardContent>
                        <Typography
                            variant='h4'
                            color='textSecondary'
                            gutterBottom
                        >
                            Add Task
                        </Typography>
                        {scrumMaster ? (
                            <form onSubmit={handleSubmit}>
                                <FormInput
                                    type='text'
                                    name='task'
                                    value={task.task}
                                    label='Task'
                                    onChange={handleChange}
                                    required
                                />
                                <FormInput
                                    type='number'
                                    name='priority'
                                    value={task.priority}
                                    label='Priority'
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        inputProps: {
                                            max: 10,
                                            min: 1,
                                        },
                                    }}
                                />
                                <FormInput
                                    type='number'
                                    name='time'
                                    value={task.time}
                                    label='Time (h)'
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        inputProps: {
                                            step: 0.5,
                                            min: 0,
                                        },
                                    }}
                                />
                                <ComboBox
                                    label='User Story'
                                    variant='outlined'
                                    comboBoxArray={storyData}
                                    required
                                    onInputChange={onInputChange}
                                    handleComboChange={handleComboChange}
                                />
                                <BtnWraper>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        size='large'
                                    >
                                        ADD
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='large'

                                        onClick={() =>
                                            setTask({
                                                task: '',
                                                priority: 0,
                                                time: 0,
                                            })
                                        }
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
                                        name='task'
                                        value={task.task}
                                        label='Task'
                                        onChange={handleChange}
                                        required
                                        disabled
                                    />
                                    <FormInput
                                        type='number'
                                        name='priority'
                                        value={task.priority}
                                        label='Priority'
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            inputProps: {
                                                max: 10,
                                                min: 1,
                                            },
                                        }}
                                        disabled
                                    />
                                    <FormInput
                                        type='number'
                                        name='time'
                                        value={task.time}
                                        label='Time (h)'
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            inputProps: {
                                                step: 0.5,
                                                min: 0,
                                            },
                                        }}
                                        disabled
                                    />
                                    <ComboBox
                                        label='User Story'
                                        variant='outlined'
                                        comboBoxArray={storyData}
                                        required
                                        onInputChange={onInputChange}
                                        handleComboChange={handleComboChange}
                                    />
                                    <BtnWraper>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            disabled
                                        >
                                            ADD
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='secondary'
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
            ) : (
                <div></div>
            )}
        </>
    );
}

// const stories = [{ label: 'Story1' }, { label: 'Story2' }, { label: 'Story3' }];

const BtnWraper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 18px;
    height: 100px;
    Button {
        // height: 60px;
        // width: fit-content;
        // font-size: 30px !important;
    }
`;
const Carde = styled(Card)`
    display: flex;
    flex-direction: column;
    height : 100%;
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
