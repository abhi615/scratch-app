import React from "react";
import Logo from "../assets/images/logo_sm.png";

const Header = () => {
  return (
    <header className="bg-blue-500 w-full h-16 flex items-center justify-between">
      <img src={Logo} alt="logo" />
      <button className="text-white bg-none font-bold">Sign In</button>
    </header>
  );
};

export default Header;
