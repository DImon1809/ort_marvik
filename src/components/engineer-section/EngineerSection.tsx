import "./EngineerSection.scss";

import { FC, useEffect, useRef, useState } from "react";

import howOrthosis from "../../assets/how-orthosis.webp";
import machine from "../../assets/machine.webp";
import machineLayout from "../../assets/machine-layout.webp";
import machineWheel from "../../assets/machineWheel.webp";
import presentation from "../../assets/presentations/3D_printer_OTM_M.pptx";
import PrinterTable from "../printer-table/PrinterTable";

const EngineerSection: FC = () => {
  const enginerrRef = useRef<HTMLDivElement>(null);
  const howOrthosisRef = useRef<HTMLDivElement>(null);

  const [moveEngineer, setMoveEngineer] = useState<boolean>(false);
  const [moveOrthosis, setMoveOrthosis] = useState<boolean>(false);

  const [isOpenSpec, setIsOpenSpec] = useState<boolean>(false);

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

  const handleOpenSpec = () => {
    setIsOpenSpec((state) => !state);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="engineer-section">
      <div
        className={isOpenSpec ? "engineer-wrapper spec" : "engineer-wrapper"}
        ref={enginerrRef}
      >
        <div
          className={moveEngineer ? "machine-wrapper move" : "machine-wrapper"}
        >
          {/* <div className="machine-images"> */}

          <img src={machine} alt="#" className="machine" loading="lazy" />
          <img
            src={machineLayout}
            alt="#"
            className="machine-layout"
            loading="lazy"
          />

          {/* </div> */}
          <div className="open-specification-wrapper">
            <p>Параметры</p>
            <div
              className={
                isOpenSpec ? "open-specification open" : "open-specification"
              }
              onClick={handleOpenSpec}
            >
              <img src={machineWheel} alt="#" />
            </div>
          </div>
        </div>

        <div
          className={
            moveEngineer ? "machine-text-wrapper move" : "machine-text-wrapper"
          }
        >
          {isOpenSpec ? (
            <PrinterTable />
          ) : (
            <>
              {/* <p>
                Инженерным составом компании был спроектирован и построен
                лабораторный прототип специализированного 3Д принтера ОТМ М.
              </p> */}
              {/* <p>
                Он имеет ряд особенностей и несомненных преимуществ, по
                сравнению с конкурентами. Конструкция предусматривает две
                печающие головки, которые позволяют увеличить производительность
                принтера, независимый нагрев стола, осуществляемый четырьмя
                пластинами, температура каждой из которых может отдельно
                настраиваться. Изделие обладает повышенной плавностью хода и
                высокой точностью печати.
              </p> */}

              <p>
                Научно–техническим составом был спроектирован и построен
                лабораторный прототип специализированного 3Д принтера ОТМ М. 3D
                принтер ОТМ М представляет из себя не просто 3D принтер, а целый
                производственный центр работающий по классической FDM технологии
                так и по разрабатываемой гибридной технологии 3D печати.{" "}
                <a href={presentation} download="presentation_OTM.pptx">
                  Презентация.
                </a>
              </p>
            </>
          )}
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
