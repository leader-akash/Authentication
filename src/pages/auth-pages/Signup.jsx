import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Auth.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/slice/auth';

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPasswordVal, setConfirmPasswordVal] = useState();
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { token } = useSelector((state) => state.auth);

    const from = location.state?.from?.pathname || '/profile'

    useEffect(() => {
        token && navigate(from, { replace: true });

    }, [token]);

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordVisible = () => {
        setIsPasswordVisible(prev => !prev);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPasswordVal(e.target.value);
    }

    const data = {
        username: username,
        email: email,
        password: password,
    }



    // for submitting the user info 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPasswordVal) {
            setIsPasswordMatch(true)
        }
        else {
            dispatch(signup(data))
        }
    }

    console.log('data', data)

    return (
        <div className='signup-container'>
            <h2> signup </h2>
            <form onSubmit={handleSubmit}>
                <div className='form-items' >
                    <label className='form-labels'> Username</label>
                    <input className='form-inputs' type='text' placeholder='username' value={username} onChange={handleUsername} required />
                </div>
                <div className='form-items'>
                    <label className='form-labels'> Email</label>
                    <input className='form-inputs' type='email' placeholder='test@gmail.com' value={email} onChange={handleEmail} required />
                </div>
                <div className='form-items'>
                    <label className='form-labels'> Password</label>
                    <input className='form-inputs' type={isPasswordVisible ? 'text' : 'password'} id="loginPassword" placeholder="******" value={password} onChange={handlePassword} required />
                    <i className={` pointer-cursor far ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`} id="togglePassword" style={{ marginLeft: '-30px' }}
                        onClick={handlePasswordVisible}
                    ></i>
                </div>
                <div className='form-items'>
                    <label className='form-labels'>Confirm Password</label>
                    <input className='form-inputs' type='text' placeholder='Confirm password' value={confirmPasswordVal} onChange={handleConfirmPassword} required />
                </div>
                <div class="errorContainer" >
                    {
                        (isPasswordMatch ? "Password do not match" : null)
                    }
                </div>

                <button className='signup-btn' type='submit' >Signup</button>
            </form>
            <p className='existing-user' onClick={() => navigate('/')}><u> &lt; Back to Login</u></p>
        </div>
    )
}

export default Signup