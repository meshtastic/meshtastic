import React from 'react';

import { Tab } from '@headlessui/react';

import type { IDevice } from '../../../data/device';

export interface PowerTabProps {
  device: IDevice;
}

export const PowerTab = ({ device }: PowerTabProps): JSX.Element => {
  return <Tab.Panel className="h-32">Content 1</Tab.Panel>;
};
