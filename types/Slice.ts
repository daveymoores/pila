interface Slice<T, K> {
  slice_type: string;
  slice_label: string | null;
  version: string;
  variation: "default-slice";
  primary: T[];
  items: K[];
}

export default Slice;
