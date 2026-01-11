export const normalize = (value: string | number) => (Number.parseFloat(String(value)) || 0).toFixed(2);
export interface VATBox {
  id: number;
  box: string;
  boxText: string;
  input: boolean;
  inputInit?: string;
  helperText?: string;
  resetText?: string;
}

export interface VATBoxValue {
  id: number;
  row: number;
  col: number;
  value: string;
  datetime: number;
}
export type BoxKey = 'box1' | 'box2' | 'box3' | 'box4' | 'box5' | 'box6' | 'box7' | 'box8' | 'box9';
export const boxInputs = (): Record<BoxKey, VATBoxValue> => {
  const now = Date.now();

  return Object.fromEntries(
    Array.from({ length: 9 }, (_, i) => {
      const id = i + 1;
      const row = Math.floor(i / 3) + 1;
      const col = (i % 3) + 1;

      return [`box${id}` as BoxKey, { id, row, col, value: '0.00', datetime: now }];
    }),
  ) as Record<BoxKey, VATBoxValue>;
};

export const VATBoxes: readonly VATBox[] = [
  {
    id: 1,
    box: 'Box 1',
    boxText: 'VAT due in the period on sales and other outputs',
    input: true,
    inputInit: '0.00',
    helperText: 'Enter amount for Box 1',
    resetText: 'Reset to £0.00',
  },
  {
    id: 2,
    box: 'Box 2',
    boxText: 'VAT due in the period on acquisitions of goods made in Northern Ireland from EU Member States',
    input: true,
    inputInit: '0.00',
    helperText: 'Enter amount for Box 2',
    resetText: 'Reset to £0.00',
  },
  {
    id: 3,
    box: 'Box 3',
    boxText: 'Total VAT due (sum of boxes 1 and 2)',
    input: false,
    inputInit: 'Calculated value',
    helperText: 'Calculated as Box 1 + Box 2',
    resetText: '',
  },
  {
    id: 4,
    box: 'Box 4',
    boxText:
      'VAT reclaimed in the period on purchases and other inputs (including acquisitions in Northern Ireland from EU member states)',
    input: true,
    inputInit: '0.00',
    helperText: 'Enter amount for Box 4',
    resetText: 'Reset to £0.00',
  },
  {
    id: 5,
    box: 'Box 5',
    boxText: 'Net VAT to pay to HMRC or reclaim (difference between boxes 3 and 4)',
    input: false,
    inputInit: 'Calculated value',
    helperText: 'Calculated as Box 3 - Box 4',
    resetText: '',
  },
  {
    id: 6,
    box: 'Box 6',
    boxText: 'Total value of sales and all other outputs excluding any VAT',
    input: true,
    inputInit: '0.00',
    helperText: 'Enter amount for Box 6',
    resetText: 'Reset to £0.00',
  },
  {
    id: 7,
    box: 'Box 7',
    boxText: 'The total value of purchases and all other inputs excluding any VAT',
    input: true,
    inputInit: '0.00',
    helperText: 'Enter amount for Box 7',
    resetText: 'Reset to £0.00',
  },
  {
    id: 8,
    box: 'Box 8',
    boxText:
      'Total value of dispatches of goods and related costs (excluding VAT) from Northern Ireland to EU Member States',
    input: true,
    inputInit: '0.00',
    helperText: 'Enter amount for Box 8',
    resetText: 'Reset to £0.00',
  },
  {
    id: 9,
    box: 'Box 9',
    boxText:
      'Total value of acquisitions of goods and related costs (excluding VAT) made in Northern Ireland from EU Member States',
    input: true,
    inputInit: '0.00',
    helperText: 'Enter amount for Box 9',
    resetText: 'Reset to £0.00',
  },
];
