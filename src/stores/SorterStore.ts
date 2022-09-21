import { action, makeObservable, observable } from "mobx";

interface ISorter {
  delay: number;
  arraySize: number;
  bars: HTMLDivElement[];
  started: boolean;
}

class SorterStore implements ISorter {
  delay = 500;
  arraySize = 60;
  bars: HTMLDivElement[] = [];
  started = false;

  constructor() {
    makeObservable(this, {
      delay: observable,
      arraySize: observable,
      started: observable,
      bars: observable,
      createNewArray: action,
    });
  }

  setDelay = (delay: number) => {
    this.delay = delay;
  };

  setArraySize = (arraySize: number) => {
    this.arraySize = arraySize;
    this.createNewArray();
  };

  deleteArray = () => {
    const bars = document.querySelector("#bars");
    if (bars) bars.innerHTML = "";
  };

  createNewArray = () => {
    this.deleteArray();
    const array = [];
    const test = [];
    for (let i = 0; i < this.arraySize; i++) {
      array.push(Math.floor(Math.random() * 500) + 1);
    }
    const bars = document.querySelector("#bars");

    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < this.arraySize; i++) {
      const bar = document.createElement("div");
      bar.style.height = `${array[i] * 1.5}px`;
      bar.classList.add("bar");
      bar.classList.add("flex-item");
      bar.classList.add(`barNo${i}`);
      test.push(bar);
      if (bars) bars.appendChild(bar);
    }
    this.bars = test;
  };
}

export default SorterStore;
