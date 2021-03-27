import React from 'react';
import Grid from '@material-ui/core/Grid';
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
        </Container>
);
export default HomePage;
