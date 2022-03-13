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
    <div className='layout'>
      <div className='box'>
      <h1>LogOut</h1>
      <button className="buttonicon" onClick={signUserOut}> Log Out</button>
      </div>
      
    
    </div>
  )
}

export default Logout