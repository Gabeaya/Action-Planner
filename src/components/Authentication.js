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
    <div className='container'>
      <div className='landingPage'>
        <h1>Welcome to the Battle Within</h1>
        <p>Within all of us there resides a battle between two wolves. The good one feeds on our joy, peace, love, hope, serenity, generosity, empathy, kindness, and truth. They envigorate the good wolf. Then there is the evil on that feasts on the bad habits. Our anger, envy, jealousy, sorrow, regret, greed, arrogance, self-pity, guilt, resentment, inferiority, lies, false pride, and ego empower him. The wolf that wins that battle is the one you feed. This app is intended to track/manifest better habits so that you may become good and powerful. Take you goals create attainable steps that coincide with deadlines so that you may put a timeline on your dreams.</p>
      </div>
      <div className="loginPage">
        <p> Sign in with Google to Begin</p>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign In</button>
      </div>
    </div>

    
  )
}

export default Authentication