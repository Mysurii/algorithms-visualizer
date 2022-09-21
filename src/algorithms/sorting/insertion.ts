import { Timeout } from "../../utils/sortingUtils";
import { COMPARE_COLOR, FINISHED_COLOR } from "../../constants";

const insertion = async (delay: number) => {
  console.log("In insertion()");
  const ele = document.querySelectorAll<HTMLDivElement>(".bar");
  // color
  ele[0].style.background = FINISHED_COLOR;
  for (let i = 1; i < ele.length; i++) {
    console.log("In ith loop");
    let j = i - 1;
    let key = ele[i].style.height;
    // color
    ele[i].style.background = COMPARE_COLOR;

    await Timeout(delay);

    while (j >= 0 && parseInt(ele[j].style.height) > parseInt(key)) {
      console.log("In while loop");
      // color
      ele[j].style.background = COMPARE_COLOR;
      ele[j + 1].style.height = ele[j].style.height;
      j--;

      await Timeout(delay);

      // color
      for (let k = i; k >= 0; k--) {
        ele[k].style.background = FINISHED_COLOR;
      }
    }
    ele[j + 1].style.height = key;
    // color
    ele[i].style.background = FINISHED_COLOR;
  }
};

export default insertion;
