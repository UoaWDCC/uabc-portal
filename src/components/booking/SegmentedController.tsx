/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { useState } from "react";

type Segment = {
  value: string;
};

type SegmentedControllerProps = {
  segments: Segment[];
  callback: (value: string) => void;
  defaultIndex?: number;
};

export const SegmentedController = (props: SegmentedControllerProps) => {
  const [activeIndex, setActiveIndex] = useState(props.defaultIndex ?? -1);

  const onInputChange = (value: string, i: number) => {
    setActiveIndex(i);
    props.callback(value);
  };

  return (
    <div className="flex">
      <div
        className={`m-auto inline-flex justify-between rounded-md bg-white p-2 shadow-lg`}
      >
        {props.segments.map((item, i) => (
          <div
            key={item.value}
            className={`relative rounded-md text-center ${
              i == activeIndex ? "absolute left-0 z-0 bg-blue-500" : ""
            }`}
          >
            <input
              type="radio"
              value={item.value}
              id={item.value}
              onChange={() => onInputChange(item.value, i)}
              checked={i == activeIndex}
              className="absolute inset-0 m-0 size-full cursor-pointer opacity-0"
            />
            <label
              htmlFor={item.value}
              className={`relative block cursor-pointer px-3 py-5 text-xs uppercase transition-colors ${
                i == activeIndex ? "text-white" : "text-gray-500"
              }`}
            >
              {item.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
