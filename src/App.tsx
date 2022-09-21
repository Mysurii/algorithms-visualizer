import { Pathfinder } from "./pages";
import Header from "./components/Navbar/Header";
import { StoreProvider } from "./stores";
import { RootStore } from "./stores/RootStore";

function App() {
  return (
    <StoreProvider store={new RootStore()}>
      <>
        <Header />
        <Pathfinder />
      </>
    </StoreProvider>
  );
}

export default App;
