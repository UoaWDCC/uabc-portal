/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { ReactNode } from "react";

type ModalProps = {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default ModalProps;
