/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Modal from "../Modal/Modal";
import SegmentedController from "../SegmentedController/SegmentedController";
import LevelSelectorProps from "./LevelSelectorProps";

const levels = ["beginner", "intermediate", "advanced"];

const LevelSelector = (props: LevelSelectorProps) => {
  return (
    <Modal isOpened={props.isOpened} onClose={props.onClose}>
      <div className="bg-gray-200 py-6 flex flex-col w-full">
        <p className="font-bold text-center mb-5">Please select a play level</p>
        <SegmentedController
          segments={levels}
          callback={props.onSelect}
          default={props.default}
        />
      </div>
    </Modal>
  );
};

export default LevelSelector;
