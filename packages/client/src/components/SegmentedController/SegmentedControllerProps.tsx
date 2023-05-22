/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

// TODO: Type ref objects

type Segment = {
  value: string;
  ref: any;
};

type SegmentedControllerProps = {
  segments: Segment[];
  callback: (value: string) => void;
  defaultIndex?: number;
  controlRef: any;
};

export default SegmentedControllerProps;
