import { Pathfinder } from "./pages";
import Header from "./components/Navbar/Header";
import { StoreProvider } from "./stores";
import { RootStore } from "./stores/RootStore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sorter from "./pages/Sorting/Sorter";

function App() {
  return (
    <StoreProvider store={new RootStore()}>
      <>
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Pathfinder />} />
            <Route path="/sorting" element={<Sorter />} />
          </Routes>
        </Router>
      </>
    </StoreProvider>
  );
}

export default App;
