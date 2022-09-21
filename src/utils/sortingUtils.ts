export const swap = (a: any, b: any) => {
  const temp = a?.style?.height;
  a.style.height = b?.style?.height;
  b.style.height = temp;
};

export const Timeout = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
