import "./InsoleSection.scss";

import { FC, useEffect,useRef, useState } from "react";

import planFuture from "../../assets/future.webp";
import insole from "../../assets/insole.webp";

const InsoleSection: FC = () => {
  const insoleRef = useRef<HTMLDivElement>(null);
  const planOnFutureRef = useRef<HTMLDivElement>(null);

  const [moveInsole, setMoveInsole] = useState<boolean>(false);
  const [movePlanOn, setMovePlanOn] = useState<boolean>(false);

  const handleScroll = () => {
    const rectInsole = insoleRef.current?.getBoundingClientRect();
    const rectPlanOn = planOnFutureRef.current?.getBoundingClientRect();

    if (rectInsole?.top! > window.innerHeight && !moveInsole)
      setMoveInsole(false);

    if (rectInsole?.top! <= window.innerHeight && !moveInsole)
      setMoveInsole(true);

    if (rectPlanOn?.top! > window.innerHeight && !movePlanOn)
      setMovePlanOn(false);

    if (rectPlanOn?.top! <= window.innerHeight && !movePlanOn)
      setMovePlanOn(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="insole-section">
      <div className="insole-wrapper" ref={insoleRef}>
        <div className={moveInsole ? "insole-text move" : "insole-text"}>
          <p>
            Еще одним приоритеным направлением в развитии нашей компании
            является печать ортопедическех стелек. Это современное решение для
            поддержки и коррекции стопы. Такие стельки разрабатываются с учётом
            индивидуальных особенностей стопы каждого пациента, что позволяет
            максимально точно учитывать анатомическое и функциональное строение
            конечностей.
          </p>
        </div>

        <div className={moveInsole ? "insole-image move" : "insole-image"}>
          <img src={insole} alt="#" loading="lazy" />
        </div>
      </div>
      <div className="plan-on-future-wrapper" ref={planOnFutureRef}>
        <div
          className={
            movePlanOn ? "plan-on-future-text move" : "plan-on-future-text"
          }
        >
          <p>Что ждет ОРТ МАРВИК в будущем?</p>
        </div>

        <div className="plan-on-future-image">
          <img src={planFuture} alt="#" />
        </div>
      </div>
    </section>
  );
};

export default InsoleSection;
