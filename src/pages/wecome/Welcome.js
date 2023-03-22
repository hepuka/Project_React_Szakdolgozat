import React from "react";

import welcome from "../../assets/cafe.png";

const Welcome = () => {
  return (
    <div className="--center-all --my5 ">
      <img src={welcome} alt="welcome" className="--my2"></img>
    </div>
  );
};

export default Welcome;
