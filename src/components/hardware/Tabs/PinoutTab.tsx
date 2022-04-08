import React from 'react';

import { Tab } from '@headlessui/react';

import type { IDevice } from '../../../data/device';

export interface PinoutTabProps {
  device: IDevice;
}

export const PinoutTab = ({ device }: PinoutTabProps): JSX.Element => {
  return <Tab.Panel className="h-32">Content 1</Tab.Panel>;
};
