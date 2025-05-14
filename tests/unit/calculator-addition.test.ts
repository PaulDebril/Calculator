import { describe, it, expect } from "vitest";
import { add } from "../../src/utils/calculator";

describe("Addition", () => {
  it("devrait additionner deux chiffres simples (1 + 1 = 2)", () => {
    expect(add(1, 1)).toBe(2);
  });

  it("devrait additionner des nombres multi-chiffres (12 + 34 = 46)", () => {
    expect(add(12, 34)).toBe(46);
  });

  it("devrait gérer les décimales (1.2 + 3.4 = 4.6)", () => {
    expect(add(1.2, 3.4)).toBeCloseTo(4.6);
  });

  it("devrait additionner un négatif à gauche (-5 + 3 = -2)", () => {
    expect(add(-5, 3)).toBe(-2);
  });

  it("devrait additionner un négatif à droite (5 + -3 = 2)", () => {
    expect(add(5, -3)).toBe(2);
  });

  it("devrait chaîner plusieurs additions ( (2 + 2) + 3 = 7 )", () => {
    const intermédiaire = add(2, 2);
    expect(add(intermédiaire, 3)).toBe(7);
  });

  it("devrait gérer les très grands nombres (999 999 999 + 1 = 1 000 000 000)", () => {
    expect(add(999999999, 1)).toBe(1000000000);
  });
});
