import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { Container } from '@material-ui/core';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => {
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
        <div className='hheader'>
            <div className={navbarClasses.join(' ')}>
                <Container className='navbar-content'>
                    <Link to='/' className='llogo-container'>
                        <img src={Logo} alt='LetScrum' />
                    </Link>
                    <div className='options'>
                        <Link to='/learn' className={optionClasses.join('active')}>
                            LEARN SCRUM
                        </Link>
                        <Link to='/project' className={optionClasses.join('active')}>
                            PROJECTS
                        </Link>
                        {/* <div onClick={() => auth.signOut()} className={optionClasses.join(' ')}>
                            SSSSSSSIgnOuttt
                        </div> */}
                        {currentUser ? (
                            <div className='auth-options'>
                                <div
                                    className={optionClasses.join(' ')}
                                    onClick={() => auth.signOut()}
                                    style={{fontWeight:'bold'}}
                                >
                                    SIGN OUT
                                </div>
                            </div>
                        ) : (
                            <div className='auth-options'>
                                <Link
                                    to='/signin'
                                    className={optionClasses.join(' ')}
                                >
                                    SIGN IN
                                </Link>
                                <Link
                                    to='/register'
                                    className={optionClasses.join(' ')}
                                >
                                    REGISTER
                                </Link>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Header);
