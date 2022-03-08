import React from 'react'
import {auth, provider} from "../firebase";
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
function Authentication({setIsAuth}) {
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true)
      navigate("/");
    });
  };

  return (
    <>
      <div className='landingPage'>
        <h1>Welcome to the Battle Within</h1>
        <p>There is an old Native American tale explaining this: Within us there are two beasts, one that feeds on our good habits and the other feeds on the bad habits. The one you feed the most is the one that triumphs the other. This app is intended to track/manifest better habits while also break down goals into smaller steps.</p>
      </div>
      <div className="loginPage">
        <p> Sign in with Google</p>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign In</button>
      </div>
    </>
    
  )
}

export default Authentication