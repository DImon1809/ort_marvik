import { FC, useEffect, useRef, useState } from "react";

import CubeSlider from "../cube-slider/CubeSlider";

import "./MainSection.scss";

import mainPosterLeft from "../../assets/main-poster-left.webp";
import mainPosterRight from "../../assets/main-poster-right.webp";

const MainSection: FC = () => {
  const introTextRef = useRef<HTMLDivElement>(null);

  const [move, setMove] = useState<boolean>(false);

  const handleScroll = (): void => {
    const rect = introTextRef?.current?.getBoundingClientRect();

    if (rect?.top! > window.innerHeight && !move) setMove(false);

    if (rect?.top! <= window.innerHeight && !move) setMove(true);
  };

  useEffect(() => {
    const rect = introTextRef?.current?.getBoundingClientRect();

    if (rect?.top! < window.innerHeight) setMove(true);
    else document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="main-section">
      <div className="anchor" id="begin"></div>
      <div className="introduction-wrapper">
        <div className="introduction-center">
          <div className="introduction-text">
            <div className="introduction-text-title">
              <h1>ОРТ Марвик</h1>
            </div>
            <div className="introduction-text-paragraph">
              <h3 className="p-1">Современная компания,</h3>
              <h3 className="p-2">основанная юными специалистами</h3>
            </div>
          </div>
        </div>
        <div className="main-poster-left">
          <img src={mainPosterLeft} alt="#" />
        </div>
        <div className="main-poster-right">
          <img src={mainPosterRight} alt="#" />
        </div>
      </div>

      <div className="introduction-footer-wrapper" ref={introTextRef}>
        <div
          className={
            move ? "introduction-footer-text move" : "introduction-footer-text"
          }
        >
          <p>
            Наша компания занимается научными исследованиями и разработками в
            области биотехнологий и аддитивных технологий. Основные направления
            нашей деятельности: исследования в области аддитивных технологий и
            применимость накопленных знаний и опыта в разработке индивидуальных
            ортопедических изделий, разработка и создание специализированных 3Д
            принтеров под требования заказчика.
          </p>
        </div>
        <div className="cube-slider-section" id="about-printer">
          <CubeSlider />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
