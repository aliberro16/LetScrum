import React, { useEffect } from 'react';
import Header from '../../components/header/header.component';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LearnImage from '../../assets/images/learn-image.svg';
import CreateProjectImage from '../../assets/images/create-project-image.svg';
import JoinTeamImage from '../../assets/images/join-team-image.svg';
import MyProjects from '../../assets/images/my-projects.svg';
import './project-page.styles.scss';
import { useLocation } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
// import Slide from '@material-ui/core/Slide';

const ProjectPage = () => {
    const [scrolled1, setScrolled1] = React.useState(false);
    const [scrolled2, setScrolled2] = React.useState(false);
    const [scrolled3, setScrolled3] = React.useState(false);
    const handleScroll = () => {
        const offset1 = window.scrollY;
        const offset2 = window.scrollY;
        const offset3 = window.scrollY;
        if (offset1 > 300) {
            setScrolled1(true);
        }

        if (offset2 > 450) {
            setScrolled2(true);
        }

        if (offset3 > 650) {
            setScrolled3(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    // if (scrolled) {
    //     navbarClasses.push('scrolled');
    //     optionClasses.push('hvr-underline2');
    // }
    return (
        <div className='page-gradient'>
            <Header/>
            <div className='project-page'>
                <div>
                    <Container>
                        <div className='body-section'>
                            <Slide up mountOnEnter>
                                <div className='header_section1'>
                                    <div>
                                        <h1 className='learn-title'>
                                            {' '}
                                            Let's Learn how to Scrum!
                                        </h1>
                                        <p className='paragraph_center'>
                                            Introduction to Scrum is tailored to
                                            help anyone interested to know more
                                            about Scrum. Learn about key
                                            concepts in Scrum as defined in the
                                            methodology and to get a basic
                                            understanding of how Scrum framework
                                            works in delivering successful
                                            projects. Here you can find video
                                            lectures on all aspects of Scrum and
                                            how it has been designed to help you
                                            implement scrum in your projects.
                                        </p>
                                    </div>

                                    <Button
                                        variant='outlined'
                                        color='secondary'
                                        className='learn-btn'
                                        size='large'
                                    >
                                        Start Learning{' '}
                                        <span className='arrow'>→</span>
                                    </Button>
                                    <img
                                        className='sprint_image'
                                        alt=''
                                        src={LearnImage}
                                    />
                                </div>
                            </Slide>
                            <Slide right when={scrolled1}>
                                <div className='header_section2'>
                                    <div className='edit_section2'>
                                        <h1> Create Project</h1>
                                        <p className='paragraph_center'>
                                            Create a new project to begin
                                            collaborating with your colleagues,
                                            add members to the team in order to
                                            start the work as soon as possible.
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
                            </Slide>
                            <Slide left when={scrolled2}>
                                <div className='header_section3'>
                                    <div className='edit_section3'>
                                        <h1> Join Team</h1>
                                        <p className='paragraph_center'>
                                            You can join a team by simply adding
                                            the project unique code and request
                                            to join one if you'd like to access
                                            the team's projects and collaborate
                                            with other people in the team.
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
                            </Slide>
                            <Slide left when={scrolled3}>
                                <div className='header_section2'>
                                    <div className='edit_section2'>
                                        <h1>My projects</h1>
                                        <p className='paragraph_center'>
                                            After contributing in many project
                                            with different teams, you have the
                                            freedom to choose the project you
                                            want to work on today from your
                                            projects list.
                                        </p>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            className='orange_button'
                                            size='large'
                                        >
                                            View projects
                                        </Button>
                                    </div>
                                    <img
                                        className='create_project_image'
                                        alt=''
                                        src={MyProjects}
                                    />
                                </div>
                            </Slide>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
