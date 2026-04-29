export type SearchParamsMap = Map<
  string,
  {
    label: string;
    field: string;
    params: Set<string | number>;
  }
>;

export type TreeViewType = {
  label: string;
  field?: string;
  children?: TreeViewType[];
};
