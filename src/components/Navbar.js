import React, { useState } from "react";
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';

import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "../styles/Navbar.styles";
import logo from '../assets/wolf.png';

function Navbar({isAuth, setIsAuth}) {
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/authentication";
    })
  };
  const [extendNavbar, setExtendNavbar] = useState(false);
  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/"> Home</NavbarLink>
            {!isAuth ? (
              <NavbarLink to="/authentication"> Login </NavbarLink> 
            ) : (
              <>
                <NavbarLink to="/createquest"> Begin a Quest</NavbarLink>
                <button onClick={signUserOut}> Log Out</button>
            </>
            )}
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src={logo}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
        <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
        {!isAuth ? (
          <NavbarLinkExtended to="/authentication"> Login </NavbarLinkExtended> 
        ) : (
          <>
            <NavbarLinkExtended to="/createquest"> Begin a Quest</NavbarLinkExtended>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </NavbarExtendedContainer>
    )}
  </NavbarContainer>
);
}

export default Navbar;