import React, { Fragment, useState } from 'react';

import { FiCheck } from 'react-icons/fi';
import { HiSelector } from 'react-icons/hi';

import { Listbox, Transition } from '@headlessui/react';

const people = [
  { id: 1, name: 'T-Beam 1.1' },
  { id: 2, name: 'T-Beam 1.0' },
  { id: 3, name: 'T-Beam 0.7' },
];

export interface VariantSelectButtonProps {
  options: any[];
}

export const VariantSelectButton = ({
  options,
}: VariantSelectButtonProps): JSX.Element => {
  const [selected, setSelected] = useState(people[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative -mt-5 ml-2 flex w-fit gap-1 rounded-lg bg-secondary p-2 py-2 pl-3 pr-10 text-lg font-medium leading-6 shadow-md hover:bg-tertiary md:mt-2">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiSelector
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${
                        active ? 'bg-indigo-600' : ''
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-semibold' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                              active ? '' : 'text-indigo-600'
                            }`}
                          >
                            <FiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
