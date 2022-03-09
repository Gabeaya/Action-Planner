import React from 'react'
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';
function Logout({setIsAuth}) {
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/authentication";
    })
  };
  return (
    <div>
      <h1>LogOut</h1>
      <button onClick={signUserOut}> Log Out</button>
    
    </div>
  )
}

export default Logout