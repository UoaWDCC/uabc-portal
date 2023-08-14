/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

type DebitDetailsCardProps = {
  title: string;
  text: string[];
  sessionId?: string;
  copy?: boolean; // TODO: redundant
  onClick?: () => void;
};

export default DebitDetailsCardProps;
