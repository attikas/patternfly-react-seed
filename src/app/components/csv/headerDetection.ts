export function detectHeaderRow(rows: string[][], sampleSize = 5): number | undefined {
  if (rows.length === 0) return;

  const max = Math.min(sampleSize, rows.length);

  for (let i = 0; i < max; i++) {
    const row = rows[i];

    const alphaCells = row.filter((c) => Number.isNaN(Number(c)) && c.trim() !== '');

    const ratio = alphaCells.length / row.length;

    // Heuristic: mostly strings, not numbers
    if (ratio > 0.7) {
      return i;
    }
  }

  return;
}
