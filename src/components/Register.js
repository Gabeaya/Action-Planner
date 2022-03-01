import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";

//user name limitations (start with either lower or uppercase letter, it must have 3-23 digits )
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//password requirements
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

import React from 'react'

const Register = () => {
  const useRef = useRef();
  const errRef = useRef();

  //username state hooks

  const [user,setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //password hooks

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //Password verification hooks

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //Error/success message hooks

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // sets the focus to use name when the component loads
  useEffect(() => {
    userRef.current.focus();

  },[])


  // this checks for the users validation
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  // checks when the password is valid with its matched passrod
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user,pwd, matchPwd])  

  return (
    <section>
      {/* this shows the error if an error exists */}
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          // if user is on input it will be focused
          onFocus={() => setUserFocus(true)}
          //if user is not in the input box it will be blurred
          onBlur={() => setUserFocus(false)}
        />
        {/* line says if userinput is in focus and if the the user has began typing or if the name they input is not valid */}
        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.<br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed.
      </p>
      </form>
    </section>

  )
}

export default Register