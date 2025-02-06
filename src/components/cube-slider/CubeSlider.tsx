import "./CubeSlider.scss";

import React from "react";

import back from "../../assets/sliders/back.webp";
import bottom from "../../assets/sliders/bottom.webp";
import front from "../../assets/sliders/front.webp";
import left from "../../assets/sliders/left.webp";
import right from "../../assets/sliders/right.webp";
import top from "../../assets/sliders/top.webp";

const CubeSlider = () => {
  return (
    <div className="cube-slider-wrapper">
      <div className="cube-slider">
        <div className="slide" id="front">
          <img src={front} alt="#" />
        </div>
        <div className="slide" id="back">
          <img src={back} alt="#" />
        </div>
        <div className="slide" id="left">
          <img src={top} alt="#" />
        </div>
        <div className="slide" id="right">
          <img src={bottom} alt="#" />
        </div>
        <div className="slide" id="top">
          <img src={left} alt="#" />
        </div>
        <div className="slide" id="bottom">
          <img src={right} alt="#" />
        </div>
      </div>
    </div>
  );
};

export default CubeSlider;
