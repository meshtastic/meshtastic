import React, { useState } from 'react';

import { FiExternalLink } from 'react-icons/fi';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

import { IDevice } from '@site/src/data/device.js';

import { HardwareModal } from './HardwareModal';

export interface HardwareCard {
  device: IDevice;
}

export const HardwareCard = ({ device }: HardwareCard): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li
        className="group relative"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100">
          <div
            className={`flex aspect-[4/3] overflow-hidden bg-gradient-to-r ${device.misc.Gradient}`}
          >
            <img
              src={device.misc.ImagePath}
              alt=""
              className="pointer-events-none m-auto object-cover p-2 group-hover:opacity-75"
            />
          </div>
          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {name}</span>
          </button>
        </div>
        <div className="flex">
          <div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {device.name}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">
              {device.specifications.LoRa}
            </p>
          </div>
          <div className="z-10 ml-auto flex gap-2 p-2 opacity-0 transition-opacity duration-100 ease-in-out group-hover:opacity-100">
            <a
              href="#"
              className="flex rounded-lg border-2 py-1 px-2 hover:border-accent"
            >
              <FiExternalLink className="m-auto" />
            </a>
            <a
              href="#"
              className="flex rounded-lg border-2 py-1 px-2 hover:border-accent"
            >
              <IoEllipsisHorizontalSharp className="m-auto" />
            </a>
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
