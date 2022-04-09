import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { FiBluetooth, FiChevronRight, FiWifi, FiX } from 'react-icons/fi';
import { useBreakpoint } from 'use-breakpoint';

import { Tab } from '@headlessui/react';
import type { IDevice } from '@site/src/data/device';

import { Button } from '../../components/Button';
import { BREAKPOINTS } from '../../utils/breakpoints';
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
  const [hideDetails, setHideDetails] = useState(false);
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <Modal open={open} onClose={close}>
      <div className="absolute right-0 z-20 m-2 md:flex">
        <Button onClick={close}>
          <FiX />
        </Button>
      </div>
      <div className="absolute inset-0">
        <motion.div
          layout
          animate={
            breakpoint === 'sm'
              ? hideDetails
                ? 'hiddenSm'
                : 'visibleSm'
              : hideDetails
              ? 'hidden'
              : 'visible'
          }
          variants={{
            hidden: { width: '100%', height: '100%' },
            hiddenSm: { height: '100%', width: '100%' },
            visible: { width: '20%', height: '100%' },
            visibleSm: { height: '33%', width: '100%' },
          }}
          transition={{
            type: 'just',
          }}
          className="flex flex-col md:h-full md:flex-row"
        >
          <motion.div
            layout
            className={`relative z-10 flex h-full w-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none ${device.misc.Gradient}`}
          >
            <motion.img
              layout
              src={device.images.Front}
              alt=""
              className="pointer-events-none m-auto max-h-full max-w-full object-cover p-2"
            />
            <div className="absolute -bottom-5 z-20 flex w-full md:bottom-auto md:-right-5 md:h-full md:w-auto">
              <Button
                animate={
                  breakpoint === 'sm'
                    ? hideDetails
                      ? 'hiddenSm'
                      : 'visibleSm'
                    : hideDetails
                    ? 'hidden'
                    : 'visible'
                }
                variants={{
                  hidden: { rotate: 180 },
                  hiddenSm: { rotate: -90 },
                  visible: { rotate: 0 },
                  visibleSm: { rotate: 90 },
                }}
                onClick={() => {
                  setHideDetails(!hideDetails);
                }}
              >
                <FiChevronRight />
              </Button>
            </div>
            <AnimatePresence>
              {!hideDetails && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute -bottom-5 z-20 flex md:mt-0 md:hidden md:pb-2 ${
                      hideDetails ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <VariantSelectButton options={device.variants} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-3 right-0 m-auto mr-2 ml-auto flex md:inset-x-1 md:bottom-4 md:mt-2"
                  >
                    <div className="m-auto flex gap-2">
                      {device.features.BLE && (
                        <Badge
                          name="Bluetooth"
                          color="bg-blue-500"
                          icon={<FiBluetooth />}
                        />
                      )}
                      {device.features.WiFi && (
                        <Badge
                          name="WiFi"
                          color="bg-orange-500"
                          icon={<FiWifi />}
                        />
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
          <div
            className={`h-7 bg-base opacity-0 md:h-auto md:w-7 ${
              hideDetails ? 'flex' : 'hidden'
            }`}
          />
        </motion.div>
      </div>
      <div className="mt-[25%] flex h-full flex-col md:ml-[20%] md:mt-0 md:w-4/5">
        <div className="z-0 hidden pb-2 md:flex">
          <VariantSelectButton options={device.variants} />
        </div>
        <div
          className={`mt-1 flex flex-grow rounded-2xl bg-base p-2 shadow-inner transition-opacity duration-100 ease-linear md:mt-0 md:rounded-l-none md:rounded-r-2xl md:p-4 ${
            hideDetails ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Tab.Group
            as="div"
            className="flex flex-grow flex-col rounded-2xl bg-primary p-2"
          >
            <Tab.List className="flex gap-2">
              <CardTab title="Info" />
              <CardTab title="Power" />
              <CardTab title="Pinout" />
            </Tab.List>
            <Tab.Panels as="div" className="flex-grow overflow-y-auto">
              <InfoTab device={device} />
              <PowerTab device={device} />
              <PinoutTab device={device} />
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Modal>
  );
};
