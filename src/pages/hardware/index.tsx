import React from 'react';
import { IDevice } from '../../data/device';
import { tbeam } from '../../data/devices/tbeam';
import { rak19003 } from '../../data/devices/rak19003';
import Layout from '@theme/Layout';

const Hardware = (): JSX.Element => {
  const [selectedDevice, setSelectedDevice] = React.useState<IDevice>();
  const hardware = [
    tbeam,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
  ];

  return (
    <Layout title="Hardware" description="Supported hardware">
      <div className="m-auto flex w-full flex-grow gap-2">
        <div className="flex w-2/3 flex-wrap gap-2 overflow-y-auto p-4">
          {hardware.map((device) => (
            <div
              className={`flex cursor-pointer select-none flex-col divide-y rounded-xl border-2 bg-primaryDark shadow-md transition duration-300 ease-in-out hover:scale-95 ${
                selectedDevice?.name === device.name
                  ? 'border-accent'
                  : 'border-secondaryDark'
              }`}
              onClick={() => {
                setSelectedDevice(device);
              }}
            >
              <div className="flex flex-grow">
                <img
                  draggable="false"
                  className="m-0 w-48 p-4"
                  src={device.misc.ImagePath}
                />
                {/* <img
              draggable="false"
              className="mt-auto p-4 m-0 w-48"
              src="/img/hardware/rak/RAK19003.png"
            /> */}
              </div>
              <div className="p-2">
                <div className="text-lg font-medium">{device.name}</div>

                <div className="flex">
                  <div className="m-auto w-min rounded-full bg-secondaryDark px-2 py-0.5 text-sm">
                    {device.specifications.Chipset}
                  </div>
                  {device.features.WiFi && (
                    <div className="m-auto w-min rounded-full bg-secondaryDark px-2 py-0.5 text-sm">
                      WiFi
                    </div>
                  )}
                  {device.features.BLE && (
                    <div className="m-auto w-min rounded-full bg-secondaryDark px-2 py-0.5 text-sm">
                      BLE
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedDevice && (
          <div className="my-4 w-1/3 flex-grow flex-grow rounded-l-xl bg-primaryDark">
            Selected Device {selectedDevice.name}
            <h3>Variants:</h3>
            {selectedDevice.variants.map((varitant) => (
              <div className="">{varitant.name}</div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Hardware;
