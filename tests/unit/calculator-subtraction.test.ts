import { describe, it, expect } from "vitest";
import { subtract } from "../../src/utils/calculator";

describe("Soustraction", () => {
  it("devrait soustraire deux entiers positifs (5 - 3 = 2)", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it("devrait retourner un résultat négatif si le second est plus grand (3 - 5 = -2)", () => {
    expect(subtract(3, 5)).toBe(-2);
  });

  it("devrait gérer les décimales (5.5 - 2.2 = 3.3)", () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });

  it("devrait soustraire zéro sans modifier le résultat (7 - 0 = 7)", () => {
    expect(subtract(7, 0)).toBe(7);
  });

  it("devrait gérer la soustraction de zéro par un nombre (0 - 7 = -7)", () => {
    expect(subtract(0, 7)).toBe(-7);
  });

  it("devrait chaîner les soustractions ((5 - 2) - 1 = 2)", () => {
    const first = subtract(5, 2);
    expect(subtract(first, 1)).toBe(2);
  });

  it("devrait gérer les cas négatifs ( -9 - 1 = -10 )", () => {
    expect(subtract(-9, 1)).toBe(-10);
  });

  it("devrait donner zéro quand on soustrait deux valeurs égales", () => {
    expect(subtract(42, 42)).toBe(0);
  });
});
