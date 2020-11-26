import React from 'react';
import logo from '../res/infinite.png'

function Header() {
  return (
    <div className="header_container">
      <img src={logo} className="header_logo"/>
      <h1 className="header_title">Infinite Feed</h1>
    </div>
  );
}

export default Header;
