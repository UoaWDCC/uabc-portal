/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

interface HeadingProps {
  children: string;
}

export const Heading = ({ children }: HeadingProps) => {
  return <div className="text-3xl font-bold">{children}</div>;
};
