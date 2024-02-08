export default function calculateADC() {
  //const variables
  const batMillivoltsFull = 4.2;
  const batMillivoltsEmpty = 3.27;
  const batFullPercent = 1;
  //variable
  const batteryChargePercent =
    Number.parseFloat(
      (<HTMLInputElement>document.getElementById("batteryChargePercent")).value,
    ) / 100;
  const operativeAdcMultiplier = Number.parseFloat(
    (<HTMLInputElement>document.getElementById("operativeAdcMultiplier")).value,
  );
  const result =
    (operativeAdcMultiplier *
      ((batFullPercent - 1) * batMillivoltsEmpty -
        batFullPercent * batMillivoltsFull)) /
    ((batteryChargePercent - 1) * batMillivoltsEmpty -
      batteryChargePercent * batMillivoltsFull);
  (<HTMLInputElement>(
    document.getElementById("newOperativeAdcMultiplier")
  )).value = result.toFixed(4);
}
