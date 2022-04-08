import React from 'react';

import { Tab } from '@headlessui/react';

import type { IDevice } from '../../../data/device';

export interface InfoTabProps {
  device: IDevice;
}

export const InfoTab = ({ device }: InfoTabProps): JSX.Element => {
  return <Tab.Panel className="h-32">Content 1</Tab.Panel>;
};
