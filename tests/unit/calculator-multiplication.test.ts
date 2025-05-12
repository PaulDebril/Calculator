import { describe, it, expect } from 'vitest';
import { multiply } from '../../src/utils/calculator';

describe('Multiplication', () => {
  it('devrait multiplier deux entiers positifs (6 * 7 = 42)', () => {
    expect(multiply(6, 7)).toBe(42);
  });

  it('devrait renvoyer 0 si on multiplie par zéro (9 * 0)', () => {
    expect(multiply(9, 0)).toBe(0);
    expect(multiply(0, 5)).toBe(0);
  });

  it('devrait gérer les décimales (2.5 * 4.2 = 10.5)', () => {
    expect(multiply(2.5, 4.2)).toBeCloseTo(10.5);
  });

  it('devrait gérer un négatif à gauche (-3 * 4 = -12)', () => {
    expect(multiply(-3, 4)).toBe(-12);
  });

  it('devrait gérer un négatif à droite (5 * -2 = -10)', () => {
    expect(multiply(5, -2)).toBe(-10);
  });

  it('devrait gérer deux négatifs (-5 * -2 = 10)', () => {
    expect(multiply(-5, -2)).toBe(10);
  });

  it('devrait chaîner les multiplications ((4 * 5) * 3 = 60)', () => {
    const intermédiaire = multiply(4, 5);
    expect(multiply(intermédiaire, 3)).toBe(60);
  });

  it('devrait retourner un float précis pour 1.1 * 1.1 = 1.21', () => {
    expect(multiply(1.1, 1.1)).toBeCloseTo(1.21);
  });
});
