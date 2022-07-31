import React from "react";
import Logo from '../../assets/logo/youtongue.svg';
import './placeholder.css'
class Header extends React.Component {
  render() {
    return(
      <div id="welcome-header-wrapper">
        <div id="welcome-header">
          <div id="welcome-header-text-wrapper">
            <div id="welcome-header-text">
              <h1>Looking for YouTube videos with captions ?</h1>
              <span>Search YouTube videos according to languages you want.</span>
            </div>
          </div>
          <div id="welcome-header-logo-wrapper">
            <img src={Logo} alt="" id="welcome-header-logo" />
          </div>
        </div>
      </div>
    )
  }
}

export default Header;