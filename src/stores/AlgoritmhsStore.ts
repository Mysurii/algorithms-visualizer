import { makeAutoObservable } from "mobx";

import { AlgorithmTypes } from "../types/algorithm";

export interface IAlgorithmsStore {
  currentAlgorithm: AlgorithmTypes;
  isResetClicked: boolean;
  isVisualizeClicked: boolean;
}

export class AlgorithmsStore implements IAlgorithmsStore {
  currentAlgorithm = AlgorithmTypes.ASTAR;
  isResetClicked: boolean = false;
  isVisualizeClicked: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentAlgorithm = (algorithm: AlgorithmTypes) => {
    this.currentAlgorithm = algorithm;
  };
  setIsResetClicked = (bool: boolean) => {
    this.isResetClicked = bool;
  };

  setIsVisualizeClicked = (bool: boolean) => {
    this.isVisualizeClicked = bool;
  };
}
