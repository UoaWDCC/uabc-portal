/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */


type ExpandedSessionCardProps = {
  id: string;
  startTime: Date;
  endTime: Date;
  location: string;
  address: string;
  level?: string;
  defaultLevel?: string;
  setLevel: (level: string | undefined) => void;
};

export default ExpandedSessionCardProps;
