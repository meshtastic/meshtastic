import React from "react";

import { Tab } from "@headlessui/react";

export interface CardTabProps {
  title: string;
}

export const CardTab = ({ title }: CardTabProps): JSX.Element => {
  return (
    <Tab
      className={({ selected }) =>
        `w-1/3 truncate rounded-md px-3 py-2 text-sm font-medium hover:bg-tertiary ${
          selected ? "bg-secondary shadow-md" : ""
        }`
      }
    >
      {title}
    </Tab>
  );
};
