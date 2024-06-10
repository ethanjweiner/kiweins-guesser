"use client";

import React, { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type Option<T> = {
  name: string;
  icon: IconProp;
  value: T;
};

export default function Select<T extends string>({
  name,
  options,
  labelContent,
}: {
  name: string;
  options: Option<T>[];
  labelContent: string;
}) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <>
      <input type="hidden" name={name} value={selected.value} />
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Label className="mt-8 block text-xl font-medium leading-6 text-gray-900">
              {labelContent}
            </Label>
            <div className="relative mt-3">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl sm:leading-6">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={selected.icon} />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-8 w-8 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xl">
                  {options.map((option) => (
                    <ListboxOption
                      key={option.name}
                      className={({ focus }) =>
                        classNames(
                          focus ? "bg-indigo-600 text-white" : "",
                          !focus ? "text-gray-900" : "",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={option}
                    >
                      {({ selected, focus }) => (
                        <>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={option.icon} />
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {option.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                focus ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
}
