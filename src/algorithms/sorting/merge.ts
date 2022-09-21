import { Timeout } from "../../utils/sortingUtils";
import { FINISHED_COLOR } from "../../constants";

const merge = async (
  ele: any,
  low: any,
  mid: any,
  high: any,
  delay: number
) => {
  const n1 = mid - low + 1;
  const n2 = high - mid;
  let left = new Array(n1);
  let right = new Array(n2);

  for (let i = 0; i < n1; i++) {
    await Timeout(delay);
    // color
    ele[low + i].style.background = "orange";
    left[i] = ele[low + i].style.height;
  }
  for (let i = 0; i < n2; i++) {
    await Timeout(delay);
    // color
    ele[mid + 1 + i].style.background = "yellow";
    right[i] = ele[mid + 1 + i].style.height;
  }
  await Timeout(delay);
  let i = 0,
    j = 0,
    k = low;
  while (i < n1 && j < n2) {
    await Timeout(delay);
    // To add color for which two r being compared for merging

    if (parseInt(left[i]) <= parseInt(right[j])) {
      // color
      if (n1 + n2 === ele.length) {
        ele[k].style.background = FINISHED_COLOR;
      } else {
        ele[k].style.background = "lightgreen";
      }

      ele[k].style.height = left[i];
      i++;
      k++;
    } else {
      // color
      if (n1 + n2 === ele.length) {
        ele[k].style.background = FINISHED_COLOR;
      } else {
        ele[k].style.background = "lightgreen";
      }
      ele[k].style.height = right[j];
      j++;
      k++;
    }
  }
  while (i < n1) {
    await Timeout(delay);
    // color
    if (n1 + n2 === ele.length) {
      ele[k].style.background = FINISHED_COLOR;
    } else {
      ele[k].style.background = "lightgreen";
    }
    ele[k].style.height = left[i];
    i++;
    k++;
  }
  while (j < n2) {
    await Timeout(delay);
    // color
    if (n1 + n2 === ele.length) {
      ele[k].style.background = FINISHED_COLOR;
    } else {
      ele[k].style.background = "lightgreen";
    }
    ele[k].style.height = right[j];
    j++;
    k++;
  }
};

const mergeSort = async (ele: any, l: any, r: any, delay: number) => {
  if (l >= r) {
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  await mergeSort(ele, l, m, delay);
  await mergeSort(ele, m + 1, r, delay);
  await merge(ele, l, m, r, delay);
};

export default mergeSort;
