import React, { useEffect } from 'react';
import SignUp from '../../components/sign-up/signup.component';
import { useLocation } from 'react-router';
const SignUpPage = (props) => {
    let location = useLocation();

    // useEffect(()=>{
    //     console.log(location.email);
    // },[])
    return (
        <div className='back'>
            <SignUp email={location.email}/>
        </div>
    );
};
export default SignUpPage;
