/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { useState } from "react";
import SegmentedControllerProps from "./SegmentedControllerProps";

const SegmentedController = (props: SegmentedControllerProps) => {
  const [activeIndex, setActiveIndex] = useState(
    props.defaultIndex ? props.defaultIndex : 0
  );
  const onSelect = (value: string, index: number) => {
    setActiveIndex(index);
    props.callback(value);
  };
  return (
    <div className="flex">
      <div className="inline-flex bg-white rounded-md m-auto shadow-lg">
        {props.segments.map((item, i) => (
          <div key={item} className={`text-center`}>
            <button
              onClick={() => onSelect(item, i)}
              className={`rounded-md transition-all duration-300 px-2 py-5 m-2 ${
                i == activeIndex ? "bg-blue-500" : "bg-none"
              }`}
            >
              <p
                className={`text-xs font-semibold ${
                  i == activeIndex ? "text-white" : "text-gray-500"
                }`}
              >
                {item.toUpperCase()}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentedController;
