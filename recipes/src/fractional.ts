export const fractional = (decimal: number) => {
  if (decimal == 0) return "0";
  let primary = Math.floor(decimal);
  const fraction = Math.round((decimal - primary) / (1.0 / 24.0));

  let num = 0;
  let denom = 0;

  if (fraction < 2) {
  } else if (fraction < 4) {
    num = 1;
    denom = 8;
  } else if (fraction < 5) {
    num = 1;
    denom = 6;
  } else if (fraction < 8) {
    num = 1;
    denom = 4;
  } else if (fraction < 11) {
    num = 1;
    denom = 3;
  } else if (fraction < 15) {
    num = 1;
    denom = 2;
  } else if (fraction < 17) {
    num = 2;
    denom = 3;
  } else if (fraction < 22) {
    num = 3;
    denom = 4;
  } else if (fraction >= 22) {
    primary++;
  }

  const formattedPrimary = primary > 0 ? `${primary}` : "";
  const interstitial = num > 0 && primary > 0 ? " " : "";
  const formattedFrac = num > 0 ? `&frac${num}${denom};` : "";

  return formattedPrimary + interstitial + formattedFrac;
};
