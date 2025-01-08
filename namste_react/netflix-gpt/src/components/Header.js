import React from "react";

import Netflix_Logo_RGB from "../assets/Netflix_Logo_RGB.png";

const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
      <img
        className="w-44"
        src={Netflix_Logo_RGB}
        alt="Netflix_Logo_RGB"
        style={{ width: "200px", height: "auto" }}
      />
    </div>
  );
};

export default Header;
