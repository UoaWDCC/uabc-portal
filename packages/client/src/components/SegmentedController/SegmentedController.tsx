/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { useState, useEffect } from "react";
import SegmentedControllerProps from "./SegmentedControllerProps";

// TODO: Remove animation on mount

const SegmentedController = (props: SegmentedControllerProps) => {
  const [activeIndex, setActiveIndex] = useState(props.defaultIndex ?? 0);

  useEffect(() => {
    const activeSegmentRef = props.segments[activeIndex].ref;
    const { offsetWidth, offsetLeft } = activeSegmentRef.current;
    const { style } = props.controlRef.current;

    style.setProperty("--highlight-width", `${offsetWidth}px`);
    style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
  }, [activeIndex, props.callback, props.segments]);

  const onInputChange = (value: string, i: number) => {
    setActiveIndex(i);
    props.callback(value);
  };

  const highlightStyles =
    "before:absolute before:top-2 before:bottom-2 before:left-0 before:z-0 before:bg-blue-500 before:rounded-md before:transition-transform";
  return (
    <div className="flex" ref={props.controlRef}>
      <div
        className={`justify-between inline-flex bg-white rounded-md m-auto shadow-lg p-2 relative ${highlightStyles}`}
        style={{}}
      >
        {props.segments.map((item, i) => (
          <div
            ref={item.ref}
            key={item.value}
            className="text-center relative z-1 rounded-md"
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
