import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../../firebase/firebase.utils';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/side-bar/side-bar.component';
import FormInput from '../../components/form-input/form-input.component';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Alert from '@material-ui/lab/Alert';
import CreateProjectImage from '../../assets/images/create-project.svg';
import Tooltip from '@material-ui/core/Tooltip';
import './create-project.styles.scss';

const CreateProjectPage = () => {
    const createdAt = new Date();
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessfull, setSuccess] = useState(null);

    const [data, setData] = useState({
        title: '',
        description: '',
        maxMembersNumber: 0,
        key: '',
        createdAt: createdAt,
    });

    const emptyProjectData = {
        title: '',
        description: '',
        maxMembersNumber: 0,
        key: '',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addProjectDocToFirestore = async () => {
        const projectRef = await firestore
            .collection('users')
            .doc(id)
            .collection('projects')
            .add(data);
        console.log(projectRef);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (data.key != '') {
                addProjectDocToFirestore();
                setSuccess(true);
                setError(false);
                setData(emptyProjectData);
                console.log('project added successfully!');
            } else {
                e.preventDefault();
                setSuccess(false);
                setErrorMessage('Please generate key');
                setError(true);
            }
        } catch (error) {
            console.error(error);
            setError(error);
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div>
                {error ? (
                    <div
                        style={{
                            width: '100%',
                            marginTop: '60px',
                            paddingLeft: '69px',
                            position: 'absolute',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Alert severity='warning'>{errorMessage}</Alert>
                    </div>
                ) : isSuccessfull ? (
                    <div
                        style={{
                            width: '100%',
                            marginTop: '64px',
                            paddingLeft: '69px',
                            position: 'absolute',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Alert severity='success' color='info'>
                            Project added successfully!
                        </Alert>
                    </div>
                ) : null}
            </div>
            <div className='first-container'>
                <div className='flex-container'>
                    <div className='sidebar'>
                        <SideBar />
                    </div>

                    <div className='f-inp'>
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                type='text'
                                name='title'
                                value={data.title}
                                onChange={handleChange}
                                label='Project title'
                                required
                            />

                            <FormInput
                                type='text'
                                name='description'
                                value={data.description}
                                onChange={handleChange}
                                label='Description'
                                multiline
                                rowsMax={3}
                            />
                            <FormInput
                                type='number'
                                name='maxMembersNumber'
                                value={data.maxMembersNumber}
                                onChange={handleChange}
                                label='Maximum members number'
                                required
                                InputProps={{
                                    inputProps: {
                                        max: 10,
                                        min: 0,
                                    },
                                }}
                            />

                            <div className='input-copy'>
                                <div className='key-input'>
                                    <FormInput
                                        type='text'
                                        name='key'
                                        value={data.key}
                                        label='Unique key'
                                        onChange={handleChange}
                                        required
                                        disabled
                                    />
                                </div>
                                <Tooltip title='Copy to clipboard'>
                                    <FileCopyIcon
                                        fontSize='large'
                                        className='copy-icon'
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                data.key
                                            );
                                        }}
                                    />
                                </Tooltip>
                            </div>

                            <div className='btn'>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    size='small'
                                    onClick={() =>
                                        setData((prevData) => ({
                                            ...prevData,
                                            key: uuidv4(),
                                        }))
                                    }
                                >
                                    GENERATE KEY
                                </Button>
                            </div>
                            <div className='buttons'>
                                <Button
                                    type='submit'
                                    color='default'
                                    variant='contained'
                                    size='large'
                                >
                                    CREATE PROJECT
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='project-image'>
                    <img src={CreateProjectImage} alt='create-project' />
                </div>
            </div>
        </>
    );
};

export default CreateProjectPage;
