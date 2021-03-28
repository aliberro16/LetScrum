import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { Container } from '@material-ui/core';
import './header.styles.scss';

const Header = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 100) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });
    let navbarClasses = ['navbar'];
    let optionClasses = ['option hvr-underline-from-center'];
    if (scrolled) {
        navbarClasses.push('scrolled');
        optionClasses.push('hvr-underline2');
    }
    return (
        <div className='header'>
            <div className={navbarClasses.join(' ')}>
                <Container className='navbar-content'>
                    <Link to='/' className='logo-container'>
                        <img src={Logo} alt='LetScrum' className='logo' />
                    </Link>
                    <div className='options'>
                        <Link to='/learn' className={optionClasses.join(' ')}>
                            LEARN
                        </Link>
                        <Link to='/about' className={optionClasses.join(' ')}>
                            ABOUT US
                        </Link>
                        <Link to='/contact' className={optionClasses.join(' ')}>
                            CONTACT US
                        </Link>
                        <div className='auth-options'>
                            <Link
                                to='/signin'
                                className={optionClasses.join(' ')}
                            >
                                SIGN IN
                            </Link>
                            <Link
                                to='/signin'
                                className={optionClasses.join(' ')}
                            >
                                REGISTER
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Header;
