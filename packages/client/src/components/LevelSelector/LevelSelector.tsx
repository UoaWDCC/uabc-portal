/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import SegmentedController from "../SegmentedController/SegmentedController";
import LevelSelectorProps from "./LevelSelectorProps";

const levels = ["beginner", "intermediate", "advanced"];

const LevelSelector = (props: LevelSelectorProps) => {
  return (
    <div
      className={`top-0 p-0 absolute flex flex-col ${
        props.open ? "w-screen h-screen" : "w-0 h-0 overflow-hidden"
      }`}
    >
      <div
        onClick={props.onClose}
        className="bg-black w-full z-50 flex flex-grow opacity-60"
      />
      <div className="w-full bg-gray-200 py-6 flex flex-col">
        <p className="font-bold text-center mb-5">Please select a play level</p>
        <SegmentedController
          segments={levels}
          callback={props.onSelect}
          defaultValue={props.defaultLevel}
        />
      </div>
    </div>
  );
};

export default LevelSelector;
