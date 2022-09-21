import { AlgorithmsStore } from "./AlgoritmhsStore";
import { GridStore } from "./GridStore";

export interface IRootStore {
  gridStore: GridStore;
  algorithmsStore: AlgorithmsStore;
}

export class RootStore implements IRootStore {
  gridStore;
  algorithmsStore;

  constructor() {
    this.gridStore = new GridStore();
    this.algorithmsStore = new AlgorithmsStore();
  }
}
