/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import React from "react";

import { Modal } from "./Modal";
import { SegmentedController } from "./SegmentedController";

interface LevelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  default?: string;
  onSelect: (level: string | undefined) => void;
}

export const LevelSelector = (props: LevelSelectorProps) => {
  const levels = [
    { value: "beginner" },
    { value: "intermediate" },
    { value: "advanced" },
  ];

  const defaultIndex = props.default
    ? levels.map((item) => item.value).indexOf(props.default)
    : -1;

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex w-full flex-col bg-gray-200 py-6">
        <p className="mb-5 text-center font-bold">Please select a play level</p>
        <SegmentedController
          segments={levels}
          callback={props.onSelect}
          defaultIndex={defaultIndex}
        />
      </div>
    </Modal>
  );
};
