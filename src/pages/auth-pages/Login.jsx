import React, { useEffect, useState } from 'react';
import './Auth.css';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slice/auth';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { token } = useSelector((state) => state.auth);

    const from = location.state?.from?.pathname || '/profile'


    useEffect(() => {
        token && navigate(from, { replace: true });
    }, [token])

    const dispatch = useDispatch();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordVisible = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const loginData = {
        email: email,
        password: password,
    }

    //handle Login
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginData))
    }


    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-items'>
                    <label className='form-labels'>Email Id</label>
                    <input className='form-inputs' type='email' placeholder='test@gmail.com' value={email} onChange={handleEmail} required />
                </div>
                <div className='form-items'>
                    <label className='form-labels'>Password</label>
                    <input className='form-inputs' type={isPasswordVisible ? 'text' : 'password'} value={password} placeholder='*******' onChange={handlePassword} required />
                    <i className={` pointer-cursor far ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`} id="togglePassword" style={{ marginLeft: '-30px' }}
                        onClick={handlePasswordVisible}
                    ></i>
                </div>

                <button className='login-btn' type='submit'>Login</button>
            </form>

            <p className='new-user' onClick={() => navigate('/signup')}><u>Not have an account? Sign up &gt;</u></p>
        </div>
    )
}

export default Login

