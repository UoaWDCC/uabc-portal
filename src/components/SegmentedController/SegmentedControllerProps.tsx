/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

type Segment = {
  value: string;
};

type SegmentedControllerProps = {
  segments: Segment[];
  callback: (value: string) => void;
  defaultIndex?: number;
};

export default SegmentedControllerProps;
