import React from 'react';

import { FiBluetooth, FiWifi, FiX } from 'react-icons/fi';
import {
  VictoryChart,
  VictoryLine,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory';

import { Tab } from '@headlessui/react';
import type { IDevice } from '@site/src/data/device';

import { Modal } from '../Modal';
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

  return (
    <Modal open={open} onClose={close}>
      <div className="inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-base text-left align-middle transition-all md:max-w-2xl md:bg-primary lg:max-w-4xl xl:max-w-6xl">
        <div className="flex flex-col md:flex-row">
          <div
            className={`relative flex aspect-[2/1] rounded-t-2xl bg-gradient-to-r md:rounded-l-2xl md:rounded-tr-none ${device.misc.Gradient}`}
          >
            <img
              src={device.misc.ImagePath}
              alt=""
              className="pointer-events-none m-auto object-cover p-2 group-hover:opacity-75"
            />
            <div className="absolute -bottom-3 right-0 m-auto mr-2 ml-auto flex gap-2 md:bottom-2 md:mr-14 md:mt-2">
              {device.features.BLE && (
                <div className="flex h-min gap-1 rounded-md bg-blue-500 px-1 text-white shadow-md">
                  <FiBluetooth className="m-auto" />
                  <span>Bluetooth</span>
                </div>
              )}
              {device.features.WiFi && (
                <div className="m-auto flex h-min gap-1 rounded-md bg-orange-500 px-1 text-white shadow-md">
                  <FiWifi className="m-auto" />
                  <span>WiFi</span>
                </div>
              )}
            </div>
          </div>

          <div
            className="absolute right-0 mr-2 flex cursor-pointer rounded-b-full bg-secondary p-3 shadow-md hover:bg-tertiary md:mt-2 md:rounded-full"
            onClick={close}
          >
            <FiX className="m-auto" />
          </div>
          <div className="md: w-full">
            <div className="flex shadow-md md:pb-2">
              <VariantSelectButton options={device.variants} />
            </div>
            <div className="bg-base p-2 md:p-4">
              <Tab.Group as="div" className="rounded-2xl bg-primary p-2">
                <Tab.List className="flex gap-2">
                  <Tab
                    className={({ selected }) =>
                      `w-1/3 rounded-md px-3 py-2 text-sm font-medium hover:bg-tertiary ${
                        selected ? 'bg-secondary shadow-md' : ''
                      }`
                    }
                  >
                    Info
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-1/3 rounded-md px-3 py-2 text-sm font-medium hover:bg-tertiary ${
                        selected ? 'bg-secondary shadow-md' : ''
                      }`
                    }
                  >
                    Power
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-1/3 rounded-md px-3 py-2 text-sm font-medium hover:bg-tertiary ${
                        selected ? 'bg-secondary shadow-md' : ''
                      }`
                    }
                  >
                    Pinout
                  </Tab>
                </Tab.List>
                <Tab.Panels as="div" className="">
                  <Tab.Panel className="h-32">Content 1</Tab.Panel>
                  <Tab.Panel className="h-96">
                    <VictoryChart
                      polar
                      theme={VictoryTheme.material}
                      domain={{ y: [0, 10] }}
                    >
                      <VictoryPolarAxis
                        dependentAxis
                        style={{ axis: { stroke: 'none' } }}
                        tickFormat={() => ''}
                      />
                      <VictoryPolarAxis
                        tickValues={[
                          0,
                          Math.PI / 2,
                          Math.PI,
                          (3 * Math.PI) / 2,
                        ]}
                        tickFormat={['2π', 'π/2', 'π', '3π/2']}
                        labelPlacement="vertical"
                      />
                      {[5, 4, 3, 2, 1].map((val, i) => {
                        return (
                          <VictoryLine
                            key={i}
                            samples={100}
                            style={{ data: { stroke: colors[i] } }}
                            y={(d) => val * (1 - Math.cos(d.x))}
                          />
                        );
                      })}
                    </VictoryChart>
                  </Tab.Panel>
                  <Tab.Panel>Content 3</Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
