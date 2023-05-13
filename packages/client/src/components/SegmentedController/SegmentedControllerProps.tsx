/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

type SegmentedControllerProps = {
  segments: string[];
  callback: (value: string) => void;
  defaultIndex?: number;
};

export default SegmentedControllerProps;
