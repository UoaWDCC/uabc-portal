/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

type TextInputProps = {
  label?: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
};

export default TextInputProps;
