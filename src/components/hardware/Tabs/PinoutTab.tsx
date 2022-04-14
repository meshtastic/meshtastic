import React from 'react';

import { Tab } from '@headlessui/react';

import type { IDevice } from '../../../data/device';

export interface PinoutTabProps {
  device: IDevice;
}

export const PinoutTab = ({ device }: PinoutTabProps): JSX.Element => {
  return (
    <Tab.Panel className="flex">
      <div className="m-auto flex gap-4 rounded-lg bg-slate-700 px-2 py-1 shadow-md">
        {[
          device.pinout.slice(0, device.misc.pinoutSplit),
          device.pinout.slice(device.misc.pinoutSplit, device.pinout.length),
        ].map((group, index) => (
          <div key={index}>
            {group.map((pin, pinIndex) => (
              <div
                className={`flex gap-1 ${
                  index === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                key={pinIndex}
              >
                <div className="m-auto h-3 w-3 rounded-full border bg-yellow-500" />
                <span className="m-auto font-mono text-white">{pin.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Tab.Panel>
  );
};
