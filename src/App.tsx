import { FC, MouseEvent } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggleGlobalWrapper } from "./store/features/menuSlice";
import { RootType } from "./store";

import Navbar from "./components/navbar/Navbar";
import MainSection from "./components/main-section/MainSection";
import EngineerSection from "./components/engineer-section/EngineerSection";
import OrthosisSection from "./components/orthosis-section/OrthosisSection";
import InsoleSection from "./components/insole-section/InsoleSection";
import FutureSection from "./components/future-section/FutureSection";
import FooterSection from "./components/footer-section/FooterSection";

import "./App.scss";

const App: FC = () => {
  const dispatch = useDispatch();

  const { isOpenMenu } = useSelector((state: RootType) => state.menuSlice);

  const handlerGlobalWrapper = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();

    dispatch(toggleGlobalWrapper(false));
  };

  return (
    <>
      {isOpenMenu ? (
        <div className="global-wrapper" onClick={handlerGlobalWrapper}></div>
      ) : (
        ""
      )}
      <Navbar />
      <MainSection />
      <EngineerSection />
      <OrthosisSection />
      <InsoleSection />
      <FutureSection />
      <FooterSection />
    </>
  );
};

export default App;
