/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import React from "react";

import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
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

  /* return (
      <Drawer>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
            <DrawerHeader>
              <DrawerDescription>Please select a play level</DrawerDescription>
            </DrawerHeader>
            <Button>Beginner</Button>
            <Button>Intermediate</Button>
            <Button>Advanced</Button>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )*/

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
