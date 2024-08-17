import { FC, useEffect, useState, useRef } from "react";

import "./OrthosisSection.scss";

import orthosis from "../../assets/orthosis.webp";

import pointOne from "../../assets/path-points/point-1.webp";
import pointTwo from "../../assets/path-points/point-2.webp";
import pointThree from "../../assets/path-points/point-3.webp";
import pointFour from "../../assets/path-points/point-4.webp";

const OrthosisSection: FC = () => {
  const orthosisRef = useRef<HTMLDivElement>(null);

  const [move, setMove] = useState<boolean>(false);

  const handleScroll = (): void => {
    const rect = orthosisRef?.current?.getBoundingClientRect();

    if (rect?.top! > window.innerHeight && !move) setMove(false);

    if (rect?.top! <= window.innerHeight && !move) setMove(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="orthosis-section">
      <div className="about-orthosis-wrapper" ref={orthosisRef}>
        <div
          className={move ? "about-orthosis-text move" : "about-orthosis-text"}
        >
          <p>
            Ортез — это медицинское устройство, предназначенное для поддержки,
            фиксации или коррекции функционирования частей тела, обычно,
            конечностей или позвоночника. Ортезы могут использоваться для
            лечения различных заболеваний и травм, а также для предотвращения их
            развития. Ортез ОТМ от компании ОРТ МАРВИК эргономичнее и намного
            удобнее классического гипса. Наша компания видит будущее в данном
            продукте и мы прикладываем все усилия для его развития и роста
            популярности.
          </p>
        </div>

        <div className="orthosis-image-wrapper">
          <img src={orthosis} alt="#" loading="lazy" />
        </div>
      </div>
      <div className="orthosis-points-wrapper">
        <div className="orthosis-points">
          <div className="orthosis-points-text">
            <p>Фиттинг ортеза состоит из четырех этапов </p>
          </div>
          <ul>
            <li className="point-wrapper">
              <img src={pointOne} alt="#" />

              <div className="point-wrapper-text">
                <p>1. Прием у врача</p>
              </div>
            </li>
            <li className="point-wrapper">
              <img src={pointTwo} alt="#" />

              <div className="point-wrapper-text">
                <p>2. Получение размеров</p>
              </div>
            </li>
            <li className="point-wrapper">
              <img src={pointThree} alt="#" />

              <div className="point-wrapper-text">
                <p>3. Печать ортеза</p>
              </div>
            </li>
            <li className="point-wrapper">
              <img src={pointFour} alt="#" />

              <div className="point-wrapper-text">
                <p>4. Наложение ортеза</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OrthosisSection;
