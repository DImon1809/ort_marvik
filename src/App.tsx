import { FC } from "react";

import Navbar from "./components/navbar/Navbar";
import MainSection from "./components/main-section/MainSection";
import EngineerSection from "./components/engineer-section/EngineerSection";

import "./App.scss";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <MainSection />
      <EngineerSection />
    </>
  );
};

export default App;
