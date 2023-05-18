/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { useState } from "react";
import SegmentedControllerProps from "./SegmentedControllerProps";

// TODO: Animation when switching

const SegmentedController = (props: SegmentedControllerProps) => {
  const [active, setActive] = useState(props.default);

  const onSelect = (value: string) => {
    setActive(value);
    props.callback(value);
  };
  return (
    <div className="flex">
      <div className="inline-flex bg-white rounded-md m-auto shadow-lg p-1">
        {props.segments.map((item) => (
          <div
            key={item}
            onClick={() => onSelect(item)}
            className={`text-center rounded-md px-3 py-4 m-1 ${
              item == active ? "bg-blue-500" : "bg-none"
            }`}
          >
            <p
              className={`text-xs font-semibold ${
                item == active ? "text-white" : "text-gray-500"
              }`}
            >
              {item.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentedController;
