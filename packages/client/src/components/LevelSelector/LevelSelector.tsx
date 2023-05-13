/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import SegmentedController from "../SegmentedController/SegmentedController";
import LevelSelectorProps from "./LevelSelectorProps";

// TODO: handle click outside

const levels = ["beginner", "intermediate", "advanced"];

const LevelSelector = (props: LevelSelectorProps) => {
  return (
    <dialog
      open={props.open}
      className="w-full bg-gray-200 absolute bottom-0 py-6"
    >
      <p className="font-bold text-center mb-5">Please select a play level</p>
      <SegmentedController
        segments={levels}
        callback={(value: string) => props.onSelect(value)}
        defaultIndex={1}
      />
    </dialog>
  );
};

export default LevelSelector;
