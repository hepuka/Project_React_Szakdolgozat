import React from "react";
import WelcomeSlider from "../../components/slider/WelcomeSlider.component";
import welcome from "../../assets/cafe.png";

const Welcome = () => {
  return (
    <div className="--center-all --my5 ">
      <img src={welcome} alt="welcome" className="--my2"></img>
      {/* <WelcomeSlider /> */}
      {/* <AdminOnlyLink /> */}
      {/* <Product /> */}
    </div>
  );
};

export default Welcome;
