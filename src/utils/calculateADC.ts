export default function calculateADC() {
  //const variables
  let BAT_MILLIVOLTS_FULL = 4.2;
  let BAT_MILLIVOLTS_EMPTY = 3.27;
  let BAT_FULL_PERCENT = 1;
  //variable
  let batteryChargePercent =
    parseFloat(
      (<HTMLInputElement>document.getElementById("batteryChargePercent")).value
    ) / 100;
  let operativeAdcMultiplier = parseFloat(
    (<HTMLInputElement>document.getElementById("operativeAdcMultiplier")).value
  );
  let result =
    (operativeAdcMultiplier *
      ((BAT_FULL_PERCENT - 1) * BAT_MILLIVOLTS_EMPTY -
        BAT_FULL_PERCENT * BAT_MILLIVOLTS_FULL)) /
    ((batteryChargePercent - 1) * BAT_MILLIVOLTS_EMPTY -
      batteryChargePercent * BAT_MILLIVOLTS_FULL);
  (<HTMLInputElement>(
    document.getElementById("newOperativeAdcMultiplier")
  )).value = result.toFixed(4);
}
