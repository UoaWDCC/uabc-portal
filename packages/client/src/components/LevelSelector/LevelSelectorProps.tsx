/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

type LevelSelectorProps = {
  open: boolean;
  onClose: () => void;
  level: string;
  onSelect: (level: string) => void;
};

export default LevelSelectorProps;
