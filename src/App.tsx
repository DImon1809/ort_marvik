import { FC, MouseEvent } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggleGlobalWrapper } from "./store/features/menuSlice";
import { toggleAlertDelete } from "./store/features/alertSlice";
import { RootType } from "./store";

import Navbar from "./components/navbar/Navbar";
import MainSection from "./components/main-section/MainSection";
import EngineerSection from "./components/engineer-section/EngineerSection";
import OrthosisSection from "./components/orthosis-section/OrthosisSection";
import InsoleSection from "./components/insole-section/InsoleSection";
import FutureSection from "./components/future-section/FutureSection";
import BecomeWrapper from "./components/become-partner/become-wrapper/BecomeWrapper";
import FooterSection from "./components/footer-section/FooterSection";

import DeleteAccount from "./alerts/delete-account/DeleteAccount";
import AlertWindow from "./alerts/alert-window/AlertWindow";

import "./App.scss";

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
      {isOpenMenu ? (
        <div className="global-wrapper" onClick={handlerGlobalWrapper}></div>
      ) : (
        ""
      )}
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
