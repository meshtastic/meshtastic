import React from "react";

import { Tab } from "@headlessui/react";

import type { IDevice } from "../../../data/device";

export interface InfoTabProps {
  device: IDevice;
}

export const InfoTab = ({ device }: InfoTabProps): JSX.Element => {
  return (
    <Tab.Panel>
      <div className="px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-secondaryInv">
              BLE/WiFi Version
            </dt>
            <dd className="mt-1 flex gap-1 text-sm text-tertiaryInv sm:col-span-2 sm:mt-0">
              <span className="rounded-md bg-secondary px-0.5">
                {device.specifications.BLEVersion}
              </span>
              /
              <span className="rounded-md bg-secondary px-0.5">
                {device.specifications.WiFiVersion}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-secondaryInv">
              BLE/WiFi Antenna
            </dt>
            <dd className="mt-1 flex gap-1 text-sm text-tertiaryInv sm:col-span-2 sm:mt-0">
              <span className="rounded-md bg-secondary px-0.5">
                {device.specifications.BLEAntenna}
              </span>
              /
              <span className="rounded-md bg-secondary px-0.5">
                {device.specifications.WiFiAntenna}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </Tab.Panel>
  );
};
