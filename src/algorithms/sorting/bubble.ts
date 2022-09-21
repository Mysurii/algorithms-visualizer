import { swap, Timeout } from "../../utils/sortingUtils";
import {
  COMPARE_COLOR,
  FINISHED_COLOR,
  IN_PROGRESS_COLOR,
} from "../../constants";

const bubble = async (delay: number) => {

  const bars = document.querySelectorAll<HTMLDivElement>(".bar");
  console.log(bars);
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.background = COMPARE_COLOR;
      bars[j + 1].style.background = COMPARE_COLOR;
      if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
        await Timeout(delay);
        swap(bars[j], bars[j + 1]);
      }
      bars[j].style.background = IN_PROGRESS_COLOR;
      bars[j + 1].style.background = IN_PROGRESS_COLOR;
    }
    bars[bars.length - 1 - i].style.background = FINISHED_COLOR;
  }
  bars[0].style.background = FINISHED_COLOR;
};

export default bubble;
