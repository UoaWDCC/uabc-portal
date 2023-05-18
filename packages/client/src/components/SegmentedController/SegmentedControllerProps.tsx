/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

type SegmentedControllerProps = {
  segments: string[];
  callback: (value: string) => void;
  default?: string;
};

export default SegmentedControllerProps;
