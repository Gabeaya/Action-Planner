import React from 'react'
import { auth } from '../firebase'
import {auth, provider} from "../firebase-config";
import {signInWithPopup} from 'firebase/auth';

function Authentication({setIsAuth}) {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {

    })
  }
  return (
    <div className="loginPage">
      <p> Sign in with Google</p>
      <button className='login-with-google-btn'>Sign In</button>
    </div>
  )
}

export default Authentication