import { FC, useEffect, useRef, useState } from "react";

import "./EngineerSection.scss";

import machine from "../../assets/machine.webp";
import machineLayout from "../../assets/machine-layout.webp";
import howOrthosis from "../../assets/how-orthosis.webp";

const EngineerSection: FC = () => {
  const enginerrRef = useRef<HTMLDivElement>(null);
  const howOrthosisRef = useRef<HTMLDivElement>(null);

  const [moveEngineer, setMoveEngineer] = useState<boolean>(false);
  const [moveOrthosis, setMoveOrthosis] = useState<boolean>(false);

  const handleScroll = (): void => {
    const rectEngineer = enginerrRef?.current?.getBoundingClientRect();
    const rectOrthosis = howOrthosisRef.current?.getBoundingClientRect();

    if (rectOrthosis?.top! > window.innerHeight && !moveOrthosis)
      setMoveOrthosis(false);

    if (rectOrthosis?.top! <= window.innerHeight && !moveOrthosis)
      setMoveOrthosis(true);

    if (rectEngineer?.top! > window.innerHeight && !moveEngineer)
      setMoveEngineer(false);

    if (rectEngineer?.top! <= window.innerHeight && !moveEngineer)
      setMoveEngineer(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="engineer-section">
      <div className="engineer-wrapper" ref={enginerrRef}>
        <div
          className={moveEngineer ? "machine-wrapper move" : "machine-wrapper"}
        >
          <img src={machine} alt="#" className="machine" />
          <img src={machineLayout} alt="#" className="machine-layout" />
        </div>

        <div
          className={
            moveEngineer ? "machine-text-wrapper move" : "machine-text-wrapper"
          }
        >
          <p>
            Инженерным составом компании был спроектирован и построен
            лабораторный прототип специализированного 3Д принтера ОТМ М.
          </p>
          <p>
            Он имеет ряд особенностей и несомненных преимуществ, по сравнению с
            конкурентами: принтер имеет две печающие головки, которые позволяют
            увеличить производительность, также нагрев стола осуществляется
            посредством четырех независимы пластин, температура каждой из
            которых может отдельно настраиваться с помощью микроконтроллера.
            Принтер облатает повышенной плавностью ходу и высокой точностью
            печати.
          </p>
        </div>
      </div>
      <div className="how-orthosis-wrapper">
        <div className="how-orthosis" ref={howOrthosisRef}>
          <div
            className={
              moveOrthosis ? "how-orthosis-text move" : "how-orthosis-text"
            }
          >
            <p>А что насчет ортезов?</p>
          </div>
          <div className="how-orthosis-image" id="about-orthosis">
            <img src={howOrthosis} alt="#" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineerSection;
