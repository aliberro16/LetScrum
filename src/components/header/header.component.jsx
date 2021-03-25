import React                        from 'react';
import { Link }                     from 'react-router-dom';
import Logo                         from '../../assets/logo.png';
import { Container }                from '@material-ui/core';

import './header.styles.scss';

const Header = () => (
    <Container > 
        <div className='header'>
            <Link to='/' className='logo-container'>
                <img  src={Logo} alt="LetScrum" className='logo'/>
            </Link>
            <div className='options'>
                <Link to='/learn' className='option'>
                    LEARN
                </Link>
                <Link to='/about' className='option'>
                    ABOUT US
                </Link>
                <Link to='/contact' className='option'>
                    CONTACT US
                </Link>
                <div className='auth-options'>
                    <Link to='/signin' className='option'>
                        SIGN IN
                    </Link>
                    <Link to='/signin' className='option'>
                        REGISTER
                    </Link>
                </div>
            </div>
        </div>
    </Container>
);

export default Header;
