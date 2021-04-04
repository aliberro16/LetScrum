import React, { useEffect } from 'react';
import Header from '../../components/header/header.component';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CreateProjectImage from '../../assets/images/create-project-image.svg';
import BackToTop from '../../components/scroll-to-top-button/ScrollButton.js';
import './landingscreen.styles.scss';
import Footer from '../../components/footer/Footer.component';
import signinImg from '../../assets/images/horizontalbg.png';
import ScrollAnimation from 'react-animate-on-scroll';

const LandingScreen = () => {
    return (
        <div className='pagebackground'>
            <Header />
            <Container className='container'>
                <div className='banner'>
                    <div className='left__banner'>
                        <h1 className='title' id='back-to-top-anchor'>
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
                    <div className='right__banner'>
                        <img
                            src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png'
                            height='650'
                            width='600'
                            className='img-fluid'
                        ></img>
                    </div>
                </div>
                <div className='info__section'>
                    <div className='info__content'>
                        <img
                            src='https://cdn2.vectorstock.com/i/1000x1000/25/01/agile-development-software-methodology-scrum-vector-21282501.jpg'
                            width='350'
                        ></img>
                        <h2 className='color__text'> Learn Easily</h2>
                        <p>
                            {' '}
                            Learn Scrum Agile development via videos and
                            courses!{' '}
                        </p>
                    </div>
                    <div className='info__content'>
                        <img
                            src='https://cdn2.vectorstock.com/i/1000x1000/25/01/agile-development-software-methodology-scrum-vector-21282501.jpg'
                            width='350'
                        ></img>
                        <h2 className='color__text1'> Build Project</h2>
                        <p> Build your projects keeping track of work </p>
                    </div>
                    <div className='info__content'>
                        <img
                            src='https://cdn2.vectorstock.com/i/1000x1000/25/01/agile-development-software-methodology-scrum-vector-21282501.jpg'
                            width='350'
                        ></img>
                        <h2 className='color__text2'> About Us</h2>
                        <p>
                            {' '}
                            LetScrum team is a group of two UA Students who made
                            their best as software engineers to give birth to
                            this friendly website{' '}
                        </p>
                    </div>
                </div>
                <div className='signup__section'>
                    <div className='signup__content'>
                        <div className='signup__content__text'>
                            <h1>LetScrum, To get your projects Done.</h1>
                            <p>Don't loose time, Login Now!</p>
                        </div>
                        <div></div>
                        <div className='signup__content__btn__image'>
                            <div className='signup__content__btn'>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    className='btn'
                                >
                                    {' '}
                                    Sign Up{' '}
                                </Button>
                            </div>
                            <img width='190px' src={signinImg}></img>
                        </div>
                    </div>
                </div>
                <div className='features__section'>
                    <div className='feature1__content'>
                        <div className='feature1__content__image'>
                            <img
                                width='500px'
                                alt=''
                                src={CreateProjectImage}
                            />
                        </div>
                        <div className='feature1__content__text'>
                            <h1> Educational and Beneficial</h1>
                            <p>
                                LetScrum shows you videos explaining scrum agile
                                development in an easy interactive way. And
                                gives you benefical courses
                            </p>
                        </div>
                    </div>
                    <div className='feature2__content'>
                        <div className='feature2__content__image'>
                            <img
                                width='500px'
                                alt=''
                                src={CreateProjectImage}
                            />
                        </div>
                        <div className='feature2__content__text'>
                            <h1> Keep track of projects</h1>
                            <p>
                                Building your projects on LetScrum enables you
                                to keep track of the project, showing you the
                                tasks to do, doing amd done
                            </p>
                        </div>
                    </div>
                    <div className='feature1__content'>
                        <div className='feature1__content__image'>
                            <img
                                width='500px'
                                alt=''
                                src={CreateProjectImage}
                            />
                        </div>
                        <div className='feature1__content__text'>
                            <h1> Two in one</h1>
                            <p>
                                Don't Forget that the project will be done using
                                scrum agile development technique. So you will
                                learn at first then get the necessary parctice
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            <BackToTop />
            <ScrollAnimation animateIn='fadeInUp' className='back'>
                <Footer />
            </ScrollAnimation>
        </div>
    );
};

export default LandingScreen;
