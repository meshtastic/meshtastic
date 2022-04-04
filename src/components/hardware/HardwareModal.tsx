import React, { useState } from 'react';

import { FiBluetooth, FiChevronRight, FiWifi, FiX } from 'react-icons/fi';

import { Tab, Transition } from '@headlessui/react';
import type { IDevice } from '@site/src/data/device';

import { Modal } from '../Modal';
import { Badge } from './Badge';
import { CardTab } from './CardTab';
import { InfoTab } from './Tabs/InfoTab';
import { PinoutTab } from './Tabs/PinoutTab';
import { PowerTab } from './Tabs/PowerTab';
import { VariantSelectButton } from './VariantSelectButton';

export interface HardwareModal {
  device: IDevice;
  open: boolean;
  close: () => void;
}

export const HardwareModal = ({
  device,
  open,
  close,
}: HardwareModal): JSX.Element => {
  const colors = ['#428517', '#77D200', '#D6D305', '#EC8E19', '#C92B05'];
  const [hideDetails, setHideDetails] = useState(false);

  return (
    <Modal open={open} onClose={close}>
      <div className="inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-base text-left align-middle transition-all md:max-w-2xl md:bg-primary lg:max-w-4xl xl:max-w-6xl">
        <div className="flex aspect-[3/2] flex-col md:aspect-[2/1] md:flex-row">
          <div
            className={`relative flex h-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none ${
              device.misc.Gradient
            } ${hideDetails ? 'w-full' : ''}`}
          >
            <img
              src={device.misc.ImagePath}
              alt=""
              className="pointer-events-none m-auto object-cover p-2 group-hover:opacity-75"
            />
            <div className="absolute -bottom-4 flex w-full md:bottom-auto md:-right-4 md:h-full md:w-auto ">
              <div
                onClick={() => {
                  setHideDetails(!hideDetails);
                }}
                className="m-auto flex cursor-pointer rounded-full bg-secondary p-2 shadow-md hover:bg-tertiary"
              >
                <FiChevronRight
                  className={`m-auto ${
                    hideDetails
                      ? 'rotate-90 md:rotate-180'
                      : '-rotate-90 md:rotate-0'
                  }`}
                />
              </div>
            </div>
            {!hideDetails && (
              <div className="absolute -bottom-3 right-0 m-auto mr-2 ml-auto flex gap-2 md:bottom-2 md:mr-14 md:mt-2">
                {device.features.BLE && (
                  <Badge
                    name="Bluetooth"
                    color="bg-blue-500"
                    icon={<FiBluetooth />}
                  />
                )}
                {device.features.WiFi && (
                  <Badge name="WiFi" color="bg-orange-500" icon={<FiWifi />} />
                )}
              </div>
            )}
          </div>

          <div
            className="absolute right-0 mr-2 flex cursor-pointer rounded-b-full bg-secondary p-3 shadow-md hover:bg-tertiary md:mt-2 md:rounded-full"
            onClick={close}
          >
            <FiX className="m-auto" />
          </div>
          <div
            className={`transition-[all] duration-100 ease-linear ${
              hideDetails ? 'h-7 bg-base md:h-auto md:w-7' : 'w-full'
            }`}
          >
            <Transition
              appear
              as={'div'}
              className="flex h-full flex-col"
              show={!hideDetails}
              enter="ease-out duration-100 delay-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100 delay-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <>
                <div className="flex shadow-md md:pb-2">
                  <VariantSelectButton options={device.variants} />
                </div>
                <div className="flex h-full bg-base p-2 md:p-4">
                  <Tab.Group
                    as="div"
                    className="flex-grow rounded-2xl bg-primary p-2"
                  >
                    <Tab.List className="flex gap-2">
                      <CardTab title="Info" />
                      <CardTab title="Power" />
                      <CardTab title="Pinout" />
                    </Tab.List>
                    <Tab.Panels as="div" className="">
                      <InfoTab device={device} />
                      <PowerTab device={device} />
                      <PinoutTab device={device} />
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </>
            </Transition>
          </div>
        </div>
      </div>
    </Modal>
  );
};
