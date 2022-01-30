import React from 'react';
import './SignInForm.css'

class SignInForm extends React.Component {

    handleSignIn = () => {
        // Attempt to sign in the user
    }

    render() {
        return (
            <form className="SignInForm">
                <div className="SignInFormRow">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username"/>
                </div>
                <div className="SignInFormRow">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email"/>
                </div>
                <div className="SignInFormRow">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password"/>
                </div>
                <div className="SignInFormRow">
                    <button onClick={this.handleSignIn}>Sign In</button>
                    <button>Register</button>
                </div>
            </form>
        );
    }
}

export default SignInForm;