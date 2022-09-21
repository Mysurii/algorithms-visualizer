import { Timeout, swap } from "../../utils/sortingUtils";

async function partition(ele: any, l: any, r: any, delay: number) {
  console.log("In partitionLomuto()");
  let i = l - 1;
  // color pivot element
  ele[r].style.background = "red";
  for (let j = l; j <= r - 1; j++) {
    console.log("In partitionLomuto for j");
    // color current element
    ele[j].style.background = "yellow";
    // pauseChamp
    await Timeout(delay);

    if (parseInt(ele[j].style.height) < parseInt(ele[r].style.height)) {
      console.log("In partitionLomuto for j if");
      i++;
      swap(ele[i], ele[j]);
      // color
      ele[i].style.background = "orange";
      if (i !== j) ele[j].style.background = "orange";
      // pauseChamp
      await Timeout(delay);
    } else {
      // color if not less than pivot
      ele[j].style.background = "pink";
    }
  }
  i++;
  // pauseChamp
  await Timeout(delay);
  swap(ele[i], ele[r]); // pivot height one
  console.log(`i = ${i}`, typeof i);
  // color
  ele[r].style.background = "pink";
  ele[i].style.background = "green";

  // pauseChamp
  await Timeout(delay);

  // color
  for (let k = 0; k < ele.length; k++) {
    if (ele[k].style.background !== "green") ele[k].style.background = "cyan";
  }

  return i;
}

async function quickSort(ele: any, l: any, r: any, delay: number) {
  console.log("In quickSort()", `l=${l} r=${r}`, typeof l, typeof r);
  if (l < r) {
    const pivotIndex = await partition(ele, l, r, delay);
    await quickSort(ele, l, pivotIndex - 1, delay);
    await quickSort(ele, pivotIndex + 1, r, delay);
  } else {
    if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
      ele[r].style.background = "green";
      ele[l].style.background = "green";
    }
  }
}

export default quickSort;
