import React, { useEffect, useState } from "react";
import { sliderData } from "./slider-data.js";
import "./Slider.scss";

const WelcomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = sliderData.length;

  // autoScroll;
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };

      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider">
      {sliderData.map((item, index) => {
        const { image } = item;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="img" />
                <div className="content">
                  <h2>Üdvözöljük</h2>
                  <hr />
                  <h2>Kunpao's Coffee</h2>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WelcomeSlider;
