import { FC, useState, useEffect, useRef } from "react";

import "./FutureSection.scss";

import seeFuture from "../../assets/see-future.webp";

const FutureSection: FC = () => {
  const futureRef = useRef<HTMLDivElement>(null);

  const [move, setMove] = useState<boolean>(false);

  const handleScroll = () => {
    const rect = futureRef.current?.getBoundingClientRect();

    if (rect?.top! > window.innerHeight && !move) setMove(false);

    if (rect?.top! <= window.innerHeight && !move) setMove(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="future-section">
      <div className="future-wrapper" ref={futureRef}>
        <div className={move ? "future-text move" : "future-text"}>
          <p>
            В данный момент наша компания активно развивается и наращивает свой
            потенциал. Недавно нами было предложено несколько инновационных
            решений в числе которых, интегрированная теплостойкая ткань для
            формовки ортезов. В данный момент, мы завершаем все подготовительные
            работы и, в ближайшее время, запустим в производство 3Д принтеры с
            большой областью печати. В скором времени также будет налажено
            производство стелек и ортезов. В планах нашей компании - выйти на
            государственный рынок РФ и занять свою достойное место среди среди
            других производителей медицинских товаров.
          </p>
        </div>

        <div className="future-image" id="become-partner">
          <img src={seeFuture} alt="#" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
