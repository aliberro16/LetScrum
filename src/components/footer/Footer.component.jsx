import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './Footer.css';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <AppBar className='footer_bg' position='static'>
            <div className='footer'>
                <Container  maxWidth='lg'>
                    <div className='footer__content'>
                        <div className='top__content'>
                            <div>
                                <div className='testimonial'>
                                    <h1 className='text__center'>
                                        {' '}
                                        Testimonial
                                    </h1>
                                    <cite>
                                        "By adopting an agile mindset and
                                        providing improved engagment
                                        collaboration,transparency and
                                        adaptability via Scrum's values, roles,
                                        event and artifacts, the results were
                                        excellent."
                                    </cite>
                                    <br />
                                    <br />
                                    <cite>
                                        "If you focus on the strength of the
                                        team, you will begin to find work as a
                                        positive challenge."
                                    </cite>
                                </div>
                                <div className='bottom__content'>
                                    <div className='btttom__content__pos'>
                                        <div className='logo__container'>
                                            <Link to='/'>
                                                <img
                                                    src={Logo}
                                                    alt='LetScrum'
                                                />
                                            </Link>
                                        </div>
                                        <div className='right__footer__content'>
                                            <Toolbar>
                                                <div className='text__social'>
                                                    <div>
                                                        <Typography
                                                            variant='body1'
                                                            color='inherit'
                                                        >
                                                            © Copyright 2021.
                                                            All rights reserved.
                                                        </Typography>
                                                        <p className='text__color'>
                                                            {' '}
                                                            LetScrum was created
                                                            using Scrum.
                                                        </p>
                                                    </div>
                                                    <div className='social-media'>
                                                        <Link to='/'>
                                                            <InstagramIcon />
                                                        </Link>
                                                        <Link to='/'>
                                                            <TwitterIcon />
                                                        </Link>
                                                        <Link to='/'>
                                                            <LinkedInIcon />
                                                        </Link>
                                                        <Link to='/'>
                                                            <FacebookIcon />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Toolbar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='spacer'></div>
                            <div className='test'>
                                <div className='contact'>
                                    <h1>Contact</h1>
                                    <p>Phone 1: +96176874009</p>
                                    <p>Phone 2: +96176367342</p>
                                    <p>Email:LetScrum@hotamil.com</p>
                                </div>
                                <div className='address'>
                                    <h1>Address</h1>
                                    <p>Beirut, Lebanon</p>
                                    <p>Baabda</p>
                                    <p>Antonine University</p>
                                </div>
                            </div>
                            <div className='spacer'></div>
                            <div className='contactus'>
                                <h1>Contact Us</h1>
                                <form>
                                    <label htmlFor='fname'>First name:</label>
                                    <br></br>
                                    <input
                                        type='text'
                                        id='fname'
                                        name='fname'
                                    />
                                    <br></br>
                                    <label htmlFor='lname'>Last name:</label>
                                    <br></br>
                                    <input
                                        type='text'
                                        id='lname'
                                        name='lname'
                                    />
                                    <br></br>
                                    <label htmlFor='lname'>Your message:</label>
                                    <br></br>
                                    <textarea
                                        name='Text1'
                                        cols='40'
                                        rows='8'
                                    ></textarea>
                                    <br></br>
                                    <input type='submit' value='Submit' />
                                    <br></br>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </AppBar>
    );
}
