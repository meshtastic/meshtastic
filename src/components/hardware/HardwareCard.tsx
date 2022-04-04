import React, { useState } from 'react';

import { IDevice, Stability } from '@site/src/data/device';

import { HardwareModal } from './HardwareModal';

export interface HardwareCardProps {
  device: IDevice;
}

export const HardwareCard = ({ device }: HardwareCardProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li
        className="group relative"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="overflow-hidden rounded-lg">
          <div
            className={`flex aspect-[4/3] overflow-hidden ${device.misc.Gradient}`}
          >
            <img
              src={device.misc.ImagePath}
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
      <HardwareModal
        open={open}
        close={() => {
          setOpen(false);
        }}
        device={device}
      />
    </>
  );
};
