import React, { useState } from "react";


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
  const [extendNavbar, setExtendNavbar] = useState(false);
  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/"> Home</NavbarLink>
            {!isAuth ? (
              <NavbarLink to="/authentication"> Get Started </NavbarLink> 
            ) : (
              <>
                <NavbarLink to="/createquest"> Begin a Quest</NavbarLink>
                <NavbarLink to="/logout"> Logout</NavbarLink>
                {/* <button onClick={signUserOut}> Log Out</button> */}
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
          <NavbarLinkExtended to="/authentication"> Get Started </NavbarLinkExtended> 
        ) : (
          <>
            <NavbarLinkExtended to="/createquest"> Begin a Quest</NavbarLinkExtended>
            <NavbarLinkExtended to="/logout"> Logout</NavbarLinkExtended>
          </>
        )}
      </NavbarExtendedContainer>
    )}
  </NavbarContainer>
);
}

export default Navbar;