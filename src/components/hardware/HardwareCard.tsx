import React from 'react';

import { IDevice, Stability } from '@site/src/data/device';

export interface HardwareCardProps {
  device: IDevice;
  setDevice: () => void;
}

export const HardwareCard = ({
  device,
  setDevice,
}: HardwareCardProps): JSX.Element => {
  return (
    <li
      className="group relative"
      onClick={() => {
        setDevice();
      }}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className={`flex aspect-[4/3] overflow-hidden ${device.misc.Gradient}`}
        >
          <img
            src={device.images.Front}
            alt=""
            className="pointer-events-none m-auto max-h-full max-w-full object-cover p-2 group-hover:opacity-75"
          />
        </div>
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {device.name}</span>
        </button>
      </div>
      <div className="flex">
        <div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-primaryInv">
            {device.name}
          </p>
          <p className="pointer-events-none flex gap-1 text-sm font-medium text-mute">
            <div
              className={`my-auto h-3 w-3 rounded-full ${
                device.misc.Stability === Stability.Broken
                  ? 'bg-red-500'
                  : device.misc.Stability === Stability.Unstable
                  ? 'bg-orange-500'
                  : device.misc.Stability === Stability.Semi
                  ? 'bg-cyan-500'
                  : 'bg-green-500'
              }`}
            />
            <div className="my-auto">{Stability[device.misc.Stability]}</div>
          </p>
        </div>
      </div>
    </li>
  );
};
