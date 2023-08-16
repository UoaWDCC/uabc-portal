/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

type LevelSelectorProps = {
  isOpened: boolean;
  onClose: () => void;
  default: string;
  onSelect: (level: string) => void;
};

export default LevelSelectorProps;
