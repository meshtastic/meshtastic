import React from 'react';
import data from '/docs/hardware/supported/devices.json'

function checkVersionOverrides(selectedDevice, version, value) {

  var versionOverride = selectedDevice.versionOverrides[version]
  var device = selectedDevice
  var objectSegment = value.split('.')

  while (objectSegment.length > 1) {
    console.log(objectSegment)
    let test = objectSegment.shift()
    console.log('test', test, 'og objectSegment', objectSegment)
    versionOverride = versionOverride[test]
    device = device[test]
  }
  if (versionOverride) {
    return versionOverride
  } else return device

  // if (selectedDevice.versionOverrides[version][value]) {
  //   return selectedDevice.versionOverrides[version][value]
  // } else {
  //   console.log("no", selectedDevice, value, selectedDevice[value])
  //   return selectedDevice[value]
  // }
}

export const MeshtasticFeatures = ({device, version}): JSX.Element => {

  const selectedDevice = data[device]

  return (
    <table>
      <thead>
        <th style={{align: "center"}}>
          Meshtastic Feature
        </th>
        <th style={{align: "center"}}>
          Device Support
        </th>
      </thead>
      <tbody>
        <tr>
          <td style={{align: "center"}}>
            Support Status
          </td>
          <td style={{align: "center"}}>
            {checkVersionOverrides(selectedDevice, version, 'supportStatus')}
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Bluetooth
          </td>
          <td style={{align: "center"}}>
            {checkVersionOverrides(selectedDevice, version, "features.bluetoothCapable")}
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Module - Canned Message
          </td>
          <td style={{align: "center"}}>
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Module - External Notification
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Module - Range Test
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Module - Rotary Encoder
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Module - Store and Forward
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Module - Telemetry (aka Environmental Measurment)
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Router - Always Powered
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Router - Solar Powered
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            WiFi
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const HardwareSpecifications = ({device, version}): JSX.Element => {

  const selectedDevice = data[device]

  return (
    <table>
      <thead>
        <th style={{align: "center"}}>
          Specification
        </th>
        <th style={{align: "center"}}>
          Value
        </th>
      </thead>
      <tbody>
        <tr>
          <td style={{align: "center"}}>
            Bluetooth
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Bluetooth Antenna
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Chipset
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Driver
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            GPS
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Flash
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Frequency - 433MHz
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Frequency - 868MHz
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Frequency - 915MHz
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            Frequency - 923MHz
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            LoRa Transceiver
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            PSRAM
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            RAM
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            WiFi
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
        <tr>
          <td style={{align: "center"}}>
            WiFi Antenna
          </td>
          <td style={{align: "center"}}>
            VALUE
          </td>
        </tr>
      </tbody>
    </table>
  );
};
