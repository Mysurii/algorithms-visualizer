import { AlgorithmsStore } from "./AlgoritmhsStore";
import { GridStore } from "./GridStore";
import SorterStore from "./SorterStore";

export interface IRootStore {
  algorithmsStore: AlgorithmsStore;
  gridStore: GridStore;
  sorterStore: SorterStore;
}

export class RootStore implements IRootStore {
  algorithmsStore;
  gridStore;
  sorterStore;

  constructor() {
    this.algorithmsStore = new AlgorithmsStore();
    this.gridStore = new GridStore();
    this.sorterStore = new SorterStore();
  }
}
