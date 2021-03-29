import React from 'react';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LearnImage from '../../assets/images/learn-image.svg';
import CreateProjectImage from '../../assets/images/create-project-image.svg';
import JoinTeamImage from '../../assets/images/join-team-image.svg';
import '../homepage/homepage.styles.scss';
import BackgroundImage from '../../assets/BlobImage.jpg';
const HomePage = () => (
    <div className='homepage'>
        <div className="background">
            <img src={BackgroundImage} />
        </div>
        <div>
            <Container>
                <div className='homepage-container'>
                    <div className='start-section'>
                        <div className='email-section'>
                            <h1 className='title'>
                                One place<br></br>for all your work.
                            </h1>
                            <h5 className='subtitle'>
                                Save one day every week. Guaranteed.
                            </h5>
                            <div className='inp-btn'>
                                <input
                                    type='email'
                                    placeholder='Enter your email address'
                                    className='email-input'
                                />
                                <Button
                                    color='primary'
                                    variant='contained'
                                    className='btn'
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='body-section'>
                        <div className='header_section1'>
                            <h1 className='learn-title'>
                                {' '}
                                Let's Learn how to Scrum!
                            </h1>
                            <p className='paragraph_center'>
                                Introduction to Scrum is tailored to help anyone
                                interested to know more about Scrum. Learn about
                                key concepts in Scrum as defined in the
                                methodology and to get a basic understanding of
                                how Scrum framework works in delivering
                                successful projects. Here you can find video
                                lectures on all aspects of Scrum and how it has
                                been designed to help you implement scrum in
                                your projects.
                            </p>
                            <Button
                                variant='outlined'
                                color='secondary'
                                className='learn-btn'
                                size='large'
                            >
                                Start Learning <span className='arrow'>→</span>
                            </Button>
                            <img
                                className='sprint_image'
                                alt=''
                                src={LearnImage}
                            />
                        </div>
                        <div className='header_section2'>
                            <div className='edit_section2'>
                                <h1> Create Project</h1>
                                <p className='paragraph_center'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut
                                </p>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    className='orange_button'
                                    size='large'
                                >
                                    Create
                                </Button>
                            </div>
                            <img
                                className='create_project_image'
                                alt=''
                                src={CreateProjectImage}
                            />
                        </div>
                        <div className='header_section3'>
                            <div className='edit_section3'>
                                <h1> Join Team</h1>
                                <p className='paragraph_center'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut
                                </p>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    className='orange_button'
                                    size='large'
                                >
                                    Join
                                </Button>
                            </div>
                            <img
                                className='create_project_image'
                                alt=''
                                src={JoinTeamImage}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    </div>
);
export default HomePage;
