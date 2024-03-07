/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { ReactNode } from "react";

interface ModalProps {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = (props: ModalProps) => {
  return (
    <div
      className={`fixed left-0 top-0 h-screen w-screen flex-col ${
        props.isOpened ? "flex" : "hidden"
      }`}
    >
      <div onClick={props.onClose} className="flex-grow bg-black opacity-60" />
      {props.children}
    </div>
  );
};
