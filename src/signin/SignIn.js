import React from 'react';
import './SignIn.css'
import SignInForm from './components/SignInForm.js'

class SignIn extends React.Component {

    render() {
        return (
            <div className='SignIn'>
                <SignInForm/>
            </div>
        );
    }
}

export default SignIn;