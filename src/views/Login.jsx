import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import LoginFunction from '../functions/LoginFunction';
import RegisterFunction from '../functions/RegisterFunction';
import VerificationFunction from '../functions/VerificationFunction';

import InputWrapper from '../components/InputWrapper';

const Login = () => {
    const [loginVisible, setLoginVisible] = useState(true);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [loginOpacityVisible, setLoginOpacityVisible] = useState(true);
    const [registerOpacityVisible, setRegisterOpacityVisible] = useState(false);

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerUsernameError, setRegisterUsernameError] = useState('');
    const [registerPasswordError, setRegisterPasswordError] = useState('');
    const [registerEmailError, setRegisterEmailError] = useState('');
    const [loginUsernameError, setLoginUsernameError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    const[registerTextTitle, setRegisterTextTitle] = useState('Already have an account?');
    const[registerTextBody, setRegisterTextBody] = useState('Log into it over here!');

    const history = useNavigate();

    const Login = () => {
        if (loginUsername === "") {
            setLoginUsernameError("This needs to be filled out");
        } else {
            setLoginUsernameError('');
        }
    
        if (loginPassword === "") {
            setLoginPasswordError("This needs to be filled out");
        } else {
            setLoginPasswordError('');
        }
    
        if (loginUsername !== '' && loginPassword !== '') {
            LoginFunction(loginUsername, loginPassword)
                .then(data => {
                    console.log(data);
                    if(data.message === "Successfully logged in."){
                        if(data.verified === 'yes'){
                            let username = data.username;
                            let token = data.token;
                            let role = data.role;
                            Cookies.set('username', username, 1/24);
                            Cookies.set('token', token, 1/24);
                            Cookies.set('role', role, 1/24);
                            history ('/');
                        }else{
                            setLoginUsernameError('Verify your email first');
                        }
                    }
                    if(data.message === "User not found"){
                        setLoginUsernameError('User not found');
                    }
                    if(data.message === "Invalid password"){
                        setLoginPasswordError("Invalid password")
                    }
                })
                .catch(error => {
                    console.error('Error logging in:', error);
                });
        }
    };

    const Register = () => {
        if (registerUsername === "") {
            setRegisterUsernameError("This needs to be filled out");
        } else {
            setRegisterUsernameError('');
        }
        if (registerPassword === "") {
            setRegisterPasswordError("This needs to be filled out");
        } else {
            setRegisterPasswordError('');
        }
        if (registerEmail === "") {
            setRegisterEmailError("This needs to be filled out");
        } else {
            setRegisterEmailError('');
        }
        if (registerUsername !== '' && registerPassword !== '' && registerEmail !== '') {
            RegisterFunction(registerUsername, registerEmail, registerPassword)
                .then(data => {
                    console.log(data);
                    if(data.message === 'Invalid email address'){
                        setRegisterEmailError(data.message);
                        return;
                    }
                    if(data.message === 'Username already exists'){
                        setRegisterUsernameError(data.message)
                        return
                    } else if(data.message === 'Registration successful'){
                        setRegisterTextTitle('Account created successfully');
                        setRegisterTextBody('An email has been sent to you to verify it');
    
                        // Send a fetch request to sendEmail.php
                        VerificationFunction(registerEmail)
                            .then(emailData => {
                                console.log('Email sent:', emailData);
                                Cookies.set('verificationToken', emailData.token)
                            })
                            .catch(emailError => {
                                console.error('Error sending email:', emailError);
                            });
                        
                        setRegisterEmail('');
                        setRegisterPassword('');
                        setRegisterUsername('');
                    }
                })
                .catch(error => {
                    console.error('Error registering:', error);
                });
        }
    };

    const showRegister = () => {
        setTimeout(() => {
            setLoginOpacityVisible(false);
            setTimeout(() => {
                setLoginVisible(false);
                setTimeout(() => {
                    setRegisterVisible(true);
                    setTimeout(() => {
                        setRegisterOpacityVisible(true);
                    }, 100)
                }, 100);
            }, 100);
        }, 100);
    };

    const showLogin = () => {
        setTimeout(() => {
            setRegisterOpacityVisible(false);
            setTimeout(() => {
                setRegisterVisible(false);
                setTimeout(() => {
                    setLoginVisible(true);
                    setTimeout(() => {
                        setLoginOpacityVisible(true);
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    };

    return (
        <div className="login-main">
            <div className="description-box">
                <form className={`form ${loginVisible ? '' : 'form-right'}`}>
                    <div className={`login-container ${loginOpacityVisible ? '' : 'hidden-opacity'} ${loginVisible ? '' : 'hidden'}`}>
                        <div className="login-title">LOG IN</div>
                        <InputWrapper type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} error={loginUsernameError} />
                        <InputWrapper type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} error={loginPasswordError} />
                        <div className="form-button-wrapper">
                            <Link className='forgot-pass' to="/recovery">Forgot password?</Link>
                            <button type='button' className='form-button' onClick={Login}>LOG IN</button>
                        </div>
                    </div>
                    <div className={`register-container ${registerOpacityVisible ? '' : 'hidden-opacity'} ${registerVisible ? '' : 'hidden'}`}>
                        <div className="login-title">REGISTER</div>
                        <InputWrapper type="text" placeholder="Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} error={registerUsernameError} />
                        <InputWrapper type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} error={registerPasswordError} />
                        <InputWrapper type="text" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} error={registerEmailError} />
                        <div className="form-button-wrapper">
                            <Link className='forgot-pass' to="/recovery">Forgot password?</Link>
                            <button type='button' className='form-button' onClick={Register}>REGISTER</button>
                        </div>
                    </div>
                </form>
                <div className="login-text-container">
                    <div className="login-text-title">Don't have an account?</div>
                    <div className="login-text-body">Create an account with us in a few easy steps!</div>
                    <button className="login-text-button" onClick={showRegister}>REGISTER</button>
                </div>
                <div className="register-text-container">
                    <div className="register-text-title">{registerTextTitle}</div>
                    <div className="register-text-body">{registerTextBody}</div>
                    <button className="register-text-button" onClick={showLogin}>LOG IN</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
