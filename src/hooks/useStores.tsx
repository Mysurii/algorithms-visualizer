import { useContext } from "react";
import { StoreContext } from "../stores";
import { RootStore } from "../stores/RootStore";

export const useStores = (): RootStore => useContext(StoreContext);