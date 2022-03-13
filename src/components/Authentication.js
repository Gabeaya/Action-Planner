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
              <h1>WELCOME TO<br/><br/>THE BATTLE WITHIN</h1>
            </div>
          </div>
          <div className='back side'>
            <div className='content'>
              <h2>An Action Planning App</h2>
              <ul>
                <li>Choose your goals</li>
                <br/>
                <li>Determine a deadline</li>
                <br/>
                <li>Break down goals into feasible steps</li>
                <br/>
                <li>Complete your goals to gain XP</li>
              </ul>
              <p>Get Started by Signing with Google</p>
              <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign In</button>
            </div>
          </div> 
        </div>
      </div>
    <Footer/>
    </>
    

    

    
  )
}

export default Authentication