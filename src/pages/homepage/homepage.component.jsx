import React from 'react';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import '../homepage/homepage.styles.scss';

const HomePage = () => (
    <Container className='left-container'>
        <h1 className='title'>
            One place<br></br>for all your work.
        </h1>
        <h5 className='subtitle'>Save one day every week. Guaranteed.</h5>
        <div className='inp-btn'>
            <input
                type='email'
                placeholder='Enter your email address'
                className='email-input'
            />
            <Button color='primary' variant='contained' className='btn'>
                Get Started
            </Button>
        </div>
        {/* <a href='' className='arrow-container'>
                        <div className='txt'>Scroll</div>
                        <div className='arrow'/>
                        <div className='arrow'/>
                        <div className='arrow'/>
                    </a> */}
        <div className='body-section'>
            <div className='header_section1'>
                <h1> Let's Learn how to Scrum!</h1>
                <p className='paragraph_center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <Button
                    variant='outlined'
                    color='secondary'
                    className='learn-btn'
                    size='large'
                >
                    Start Learning →
                </Button>
                <img
                    className='sprint_image'
                    alt=''
                    src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png'
                />
            </div>
            <div className='header_section2'>
                <div className='edit_section2'>
                    <h1> Create Project</h1>
                    <p className='paragraph_center'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut
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
                    src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png'
                />
            </div>
            <div className='header_section3'>
                <div className='edit_section3'>
                    <h1> Join Team</h1>
                    <p className='paragraph_center'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut
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
                    src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png'
                />
            </div>
        </div>
    </Container>
);
export default HomePage;
