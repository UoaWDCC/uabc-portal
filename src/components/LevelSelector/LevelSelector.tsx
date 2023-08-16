/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Modal from "../Modal/Modal";
import SegmentedController from "../SegmentedController/SegmentedController";
import LevelSelectorProps from "./LevelSelectorProps";
import React from "react";

const LevelSelector = (props: LevelSelectorProps) => {
  const levels = [
    { value: "beginner" },
    { value: "intermediate" },
    { value: "advanced" },
  ];

  const defaultIndex = levels.map((item) => item.value).indexOf(props.default);

  return (
    <Modal isOpened={props.isOpened} onClose={props.onClose}>
      <div className="bg-gray-200 py-6 flex flex-col w-full">
        <p className="font-bold text-center mb-5">Please select a play level</p>
        <SegmentedController
          segments={levels}
          callback={props.onSelect}
          defaultIndex={defaultIndex != -1 ? defaultIndex : undefined}
        />
      </div>
    </Modal>
  );
};

export default LevelSelector;