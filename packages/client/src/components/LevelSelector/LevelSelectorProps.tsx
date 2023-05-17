/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

type LevelSelectorProps = {
  open: boolean;
  onClose: () => void;
  defaultLevel: string;
  onSelect: (level: string) => void;
};

export default LevelSelectorProps;
