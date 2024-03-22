/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import clsx from "clsx";
import { Modal } from "./Modal";
import { SegmentedController } from "./SegmentedController";
import React from "react";

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
    <>
      <div
        className={clsx(
          "fixed left-0 top-0 flex h-[100vh] w-[100vw] items-end bg-black opacity-20",
          !props.isOpen && "hidden",
        )}
        onClick={() => props.onClose()}
      ></div>
      <div
        className={clsx(
          "fixed bottom-0 flex h-[250px] w-full flex-col rounded-t-[10rem] bg-white",
          !props.isOpen && "hidden",
        )}
      >
        <div className="Proxima mt-8 text-3xl font-bold">
          <p className="inter mb-5 select-none text-center font-bold text-[black]">
            Please select a play level
          </p>
        </div>
        <SegmentedController
          segments={levels}
          callback={props.onSelect}
          defaultIndex={defaultIndex}
        />
      </div>
    </>
  );

  // return (
  //   <Modal
  //     isOpen={props.isOpen}
  //     onClose={props.onClose}
  //     className="fixed bottom-[300px] h-full w-full"
  //   >
  //     <div className="flex w-full flex-col bg-gray-200 py-6 ">
  //       <p className="mb-5 text-center font-bold">Please select a play level</p>
  //       <SegmentedController
  //         segments={levels}
  //         callback={props.onSelect}
  //         defaultIndex={defaultIndex}
  //       />
  //     </div>
  //   </Modal>
  // );
};
