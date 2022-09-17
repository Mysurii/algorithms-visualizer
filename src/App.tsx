import React from "react";
import { Pathfinder } from "./components";
import Header from "./components/Navbar/Header";

import { AlgorithmsProvider } from "./contexts/AlgorithmsContext";

function App() {
  return (
    <AlgorithmsProvider>
      <>
        <Header />
      <Pathfinder />
      </>
    </AlgorithmsProvider>
  );
}

export default App;
