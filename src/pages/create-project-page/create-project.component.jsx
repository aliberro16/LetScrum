import React, { useState } from 'react';
import SideBar from '../../components/side-bar/side-bar.component';
import FormInput from '../../components/form-input/form-input.component';
import Button from '@material-ui/core/Button';
import './create-project.styles.scss';
import { v4 as uuidv4 } from 'uuid';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const CreateProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [maxMembersNum, setMaxMembersNum] = useState(0);
    const [key, setKey] = useState('');

    const handleChange1 = (event) => {
        const title = event.target.value;
        setTitle(title);
    };

    const handleChange2 = (event) => {
        const description = event.target.value;
        setDescription(description);
    };

    const handleChange3 = (event) => {
        const maxMembersNum = event.target.value;
        setMaxMembersNum(maxMembersNum);
    };

    const handleChange4 = (event) => {
        const key = event.target.value;
        setKey(key);
    };

    return (
        <div className='flex-container'>
            <div>
                <SideBar />
            </div>
            <div className='f-inp'>
                <form
                    onSubmit={() => {
                        console.log('Submission done!');
                    }}
                >
                    <FormInput
                        type='text'
                        name='Title'
                        value={title}
                        onChange={handleChange1}
                        label='Project title'
                        required
                    />
                    <FormInput
                        type='text'
                        name='Description'
                        value={description}
                        onChange={handleChange2}
                        label='Description'
                    />
                    <FormInput
                        type='number'
                        name='MaxMembersNumber'
                        value={maxMembersNum}
                        onChange={handleChange3}
                        label='Maximum members number'
                        required
                    />

                    <div className='input-copy'>
                        <div style={{backgroundColor:'red'}}>
                            <FormInput
                                type='text'
                                name='Key'
                                value={key}
                                label='Unique key'
                                required
                                disabled={true}
                            />
                        </div>
                        <div  style={{backgroundColor:'green',width:'inherit',display:'flex',alignItems:'center'}}>
                            <FileCopyIcon fontSize='large' />
                        </div>
                    </div>

                    <div className='btn'>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            onClick={() => setKey(uuidv4())}
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
    );
};

export default CreateProject;
