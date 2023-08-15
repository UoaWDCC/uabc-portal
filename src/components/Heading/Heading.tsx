/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import HeadingProps from "./HeadingProps";

const Heading = ({children}: HeadingProps) => {
  return <div className="font-bold text-3xl">{children}</div>;
};

export default Heading;
