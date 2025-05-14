export interface HistoryEntry {
  expr: string;
  result: string | number;
}

export const addToHistory = (
  history: HistoryEntry[],
  entry: HistoryEntry,
): HistoryEntry[] => {
  return [entry, ...history];
};

export const clearHistory = (): HistoryEntry[] => {
  return [];
};

export const selectFromHistory = (entry: HistoryEntry) => {
  return {
    expression: entry.expr,
    result: entry.result,
    prevExpression: entry.expr,
    isCalculated: true,
  };
};
