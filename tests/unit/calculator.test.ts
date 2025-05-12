import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '../../src/utils/calculator';

describe('End-to-End Calculations (unitaires)', () => {
  it('devrait faire (5 + 3) * 2 - 4 / 2 = 6', () => {
    const step1 = add(5, 3); 
    const step2 = multiply(step1, 2);
    const step3 = subtract(step2, 4);
    const result = divide(step3, 2);
    expect(result).toBe(6);
  });

  it('devrait enchaîner 1 + 2 - 3 * 4 / 2 = 0', () => {
    const sum = add(1, 2);
    const minus = subtract(sum, 3);
    const times = multiply(minus, 4);
    const result = divide(times, 2);
    expect(result).toBe(0);
  });

  it('devrait faire un calcul, le réinitialiser, puis en refaire un autre (9 + 1 puis 7 * 3)', () => {
    const firstCalc = add(9, 1);
    expect(firstCalc).toBe(10);

    const secondCalc = multiply(7, 3);
    expect(secondCalc).toBe(21);
  });
});
