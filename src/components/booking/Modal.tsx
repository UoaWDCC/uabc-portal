/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import clsx from "clsx";
import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = (props: ModalProps) => {
  return (
    <div
      className={twJoin(
        "fixed left-0 top-0 flex h-dvh w-dvw flex-col",
        !props.isOpen && "hidden",
      )}
    >
      <div
        onClick={props.onClose}
        className={clsx("flex-grow bg-black opacity-60", `${props.className}`)}
      />
      {props.children}
    </div>
  );
};
