/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import ModalProps from "./ModalProps";

const Modal = (props: ModalProps) => {
  return (
    <div
      className={`top-0 fixed w-screen h-screen flex-col ${
        props.isOpened ? "flex" : "hidden"
      }`}
    >
      <div onClick={props.onClose} className="bg-black flex-grow opacity-60" />
      <div>{props.children}</div>
    </div>
  );
};

export default Modal;
