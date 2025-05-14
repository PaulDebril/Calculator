import { describe, it, expect } from "vitest";
import {
  addToHistory,
  clearHistory,
  selectFromHistory,
  HistoryEntry,
} from "../../src/utils/history";

describe("historyUtils", () => {
  const sampleHistory: HistoryEntry[] = [
    { expr: "1+2", result: 3 },
    { expr: "3*4", result: 12 },
  ];

  it("ajoute une entrée à l’historique", () => {
    const newEntry = { expr: "5-1", result: 4 };
    const updated = addToHistory(sampleHistory, newEntry);
    expect(updated.length).toBe(3);
    expect(updated[0]).toEqual(newEntry);
  });

  it("réinitialise l’historique", () => {
    const cleared = clearHistory();
    expect(cleared).toEqual([]);
  });

  it("retourne les bonnes valeurs de sélection d’une entrée", () => {
    const entry = { expr: "10/2", result: 5 };
    const state = selectFromHistory(entry);
    expect(state.expression).toBe("10/2");
    expect(state.result).toBe(5);
    expect(state.prevExpression).toBe("10/2");
    expect(state.isCalculated).toBe(true);
  });
});
