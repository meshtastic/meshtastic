export default function calculateADC() {
  //const variables
  var BAT_MILLIVOLTS_FULL = 4.2;
  var BAT_MILLIVOLTS_EMPTY = 3.27;
  var BAT_FULL_PERCENT = 1;
  //variable
  var batteryChargePercent =
    parseFloat(
      (<HTMLInputElement>document.getElementById("batteryChargePercent")).value
    ) / 100;
  var operativeAdcMultiplier = parseFloat(
    (<HTMLInputElement>document.getElementById("operativeAdcMultiplier")).value
  );
  var result =
    (operativeAdcMultiplier *
      ((BAT_FULL_PERCENT - 1) * BAT_MILLIVOLTS_EMPTY -
        BAT_FULL_PERCENT * BAT_MILLIVOLTS_FULL)) /
    ((batteryChargePercent - 1) * BAT_MILLIVOLTS_EMPTY -
      batteryChargePercent * BAT_MILLIVOLTS_FULL);
  (<HTMLInputElement>(
    document.getElementById("newOperativeAdcMultiplier")
  )).value = result.toFixed(4);
}
