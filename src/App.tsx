/* eslint-disable react/react-in-jsx-scope */
import "./App.scss";

import { FC, MouseEvent } from "react";
import { useDispatch,useSelector } from "react-redux";

import AlertWindow from "./alerts/alert-window/AlertWindow";
import DeleteAccount from "./alerts/delete-account/DeleteAccount";
import BecomeWrapper from "./components/become-partner/become-wrapper/BecomeWrapper";
import EngineerSection from "./components/engineer-section/EngineerSection";
import FooterSection from "./components/footer-section/FooterSection";
import FutureSection from "./components/future-section/FutureSection";
import InsoleSection from "./components/insole-section/InsoleSection";
import MainSection from "./components/main-section/MainSection";
import Navbar from "./components/navbar/Navbar";
import OrthosisSection from "./components/orthosis-section/OrthosisSection";
import { RootType } from "./store";
import { toggleAlertDelete } from "./store/features/alertSlice";
import { toggleGlobalWrapper } from "./store/features/menuSlice";

const App: FC = () => {
  const dispatch = useDispatch();

  const { isOpenMenu } = useSelector((state: RootType) => state.menuSlice);
  const { isDelete } = useSelector((state: RootType) => state.alertSlice);

  const handlerGlobalWrapper = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (isOpenMenu && isDelete) {
      dispatch(toggleAlertDelete(false));
      return dispatch(toggleGlobalWrapper(false));
    }

    dispatch(toggleGlobalWrapper(false));
  };

  return (
    <>
      {isOpenMenu ? <div className="global-wrapper" onClick={handlerGlobalWrapper}></div> : ""}
      <Navbar />
      <AlertWindow />
      <DeleteAccount />
      <MainSection />
      <EngineerSection />
      <OrthosisSection />
      <InsoleSection />
      <FutureSection />
      <BecomeWrapper />
      <FooterSection />
    </>
  );
};

export default App;
