import { describe, it, expect } from 'vitest';
import { divide } from '../../src/utils/calculator';

describe('Division', () => {
  it('devrait diviser deux entiers positifs (8 / 2 = 4)', () => {
    expect(divide(8, 2)).toBe(4);
  });

  it('devrait gérer zéro divisé par un nombre (0 / 5 = 0)', () => {
    expect(divide(0, 5)).toBe(0);
  });

  it('devrait renvoyer Infinity quand on divise par zéro (7 / 0)', () => {
    expect(() => divide(7, 0)).toThrow('Division par zéro');
  });

  it('devrait diviser des décimales (5.5 / 2.2 = 2.5)', () => {
    expect(divide(5.5, 2.2)).toBeCloseTo(2.5);
  });

  it('devrait diviser un négatif par un positif (-9 / 3 = -3)', () => {
    expect(divide(-9, 3)).toBe(-3);
  });

  it('devrait diviser un positif par un négatif (10 / -2 = -5)', () => {
    expect(divide(10, -2)).toBe(-5);
  });

  it('devrait diviser deux négatifs (-6 / -3 = 2)', () => {
    expect(divide(-6, -3)).toBe(2);
  });

  it('devrait gérer des résultats fractionnaires (1 / 2 = 0.5)', () => {
    expect(divide(1, 2)).toBeCloseTo(0.5);
  });

  it('devrait chaîner plusieurs divisions ((20 / 4) / 2 = 2.5)', () => {
    const first = divide(20, 4);
    expect(divide(first, 2)).toBeCloseTo(2.5);
  });
});
