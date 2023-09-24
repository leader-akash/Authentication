import React, { useState } from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { logoutHandler } from '../../redux/slice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Profile = () => {

  const navigate = useNavigate('');
  const dispatch = useDispatch();
  const [selectUserImg, setSelectUserImg] = useState();

  const {user} = useSelector((state)=> state.auth);

  console.log('infoooo', user)

  const handleLogout = () => {
    dispatch(logoutHandler());
    toast.success("Logged out successfully")
    navigate("/")
  }

  //adding the user profile image 
  const handleUserImage = async (e, selectedFunction) => {
    const file = e.target?.files[0];
    const toBase64 = (file) =>

      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err);
      });

    try {
      let base64File = await toBase64(file);
      selectedFunction(base64File);

    }
    catch (err) {
      console.log('img-select-err', err)
    }
  }

  return (
    <div className='profile-container'>

      <h2>Profile</h2>
      {
        selectUserImg ? 
      <img className='profile-img' src={selectUserImg} alt='img' />
        :
      <img className='profile-img' src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' alt='img' />
      }
      <label className='choose-img' for='edit-choose-user-img'>
        <i class="fas fa-camera edit-camera"></i>
        <input type='file' id='edit-choose-user-img'
          style={{ display: 'none', visibility: 'none' }}
          accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
          onChange={(e) => handleUserImage(e, setSelectUserImg)}
        />
      </label>

      <div className='user-data'>
        <p className='user-items'>
          Username: <span className='user-info'>{user.username}</span>
        </p>
        <p className='user-items'>
          Email Id: <span className='user-info'>{user.email}</span>
        </p>

      </div>


      <button onClick={()=>{handleLogout()}} className='logout-btn'>Logout</button>

    </div>
  )
}

export default Profile