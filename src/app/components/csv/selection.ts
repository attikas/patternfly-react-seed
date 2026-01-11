export type SelectedCell = {
  row: number;
  col: number;
  value: string;
  error?: { message: string };
};
