import React from 'react'
import {auth, provider} from "../firebase";
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import Footer from './Footer';
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
      <div className='container2'>
        <div className='front side'>
          <div className="content"> 
            <h1>WELCOME TO<br/>THE BATTLE WITHIN</h1>
          </div>
        </div>
        <div className='back side'>
          <div className='content'>
            <p>Within all of us there resides a battle between two wolves. The good one feeds on our joy, peace, love, hope, serenity, generosity, empathy, kindness, and truth. They envigorate the good wolf. Then there is the evil on that feasts on the bad habits. Our anger, envy, jealousy, sorrow, regret, greed, arrogance, self-pity, guilt, resentment, inferiority, lies, false pride, and ego empower him. The wolf that wins that battle is the one you feed. This app is intended to track/manifest better habits so that you may become good and powerful. Take you goals create attainable steps that coincide with deadlines so that you may put a timeline on your dreams.</p>
            </div>
          </div>
        {/* <div className="loginPage">
          <p> Sign in with Google to Begin</p>
          <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign In</button>
        </div>  */}
      </div>
    </div>
    <Footer/>
    </>
    

    

    
  )
}

export default Authentication