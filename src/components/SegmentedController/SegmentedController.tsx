/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { useState } from "react";
import SegmentedControllerProps from "./SegmentedControllerProps";

const SegmentedController = (props: SegmentedControllerProps) => {
  const [activeIndex, setActiveIndex] = useState(props.defaultIndex ?? 0);

  const onInputChange = (value: string, i: number) => {
    setActiveIndex(i);
    props.callback(value);
  };

  return (
    <div className="flex">
      <div
        className={`justify-between inline-flex bg-white rounded-md m-auto shadow-lg p-2`}
        style={{}}
      >
        {props.segments.map((item, i) => (
          <div
            key={item.value}
            className={`text-center relative z-1 rounded-md ${
              i == activeIndex ? "absolute left-0 z-0 bg-blue-500" : ""
            }`}
          >
            <input
              type="radio"
              value={item.value}
              id={item.value}
              onChange={() => onInputChange(item.value, i)}
              checked={i == activeIndex}
              className="opacity-0 m-0 top-0 right-0 bottom-0 left-0 absolute w-full cursor-pointer h-full"
            />
            <label
              htmlFor={item.value}
              className={`cursor-pointer block px-3 py-5 relative transition-colors text-xs ${
                i == activeIndex ? "text-white" : "text-gray-500"
              }`}
            >
              {item.value.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentedController;
