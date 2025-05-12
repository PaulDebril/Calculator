import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '../../src/utils/calculator';

describe('Addition', () => {
  it('additionne deux entiers positifs', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('additionne un entier et zéro', () => {
    expect(add(7, 0)).toBe(7);
  });

  it('additionne deux zéros', () => {
    expect(add(0, 0)).toBe(0);
  });

  it('additionne deux nombres négatifs', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  it('additionne un négatif et un positif', () => {
    expect(add(-3, 8)).toBe(5);
  });

  it('additionne des nombres à virgule', () => {
    expect(add(1.5, 2.3)).toBeCloseTo(3.8);
  });
});

describe('Soustraction', () => {
  it('soustrait deux entiers positifs', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  it('soustrait un entier et zéro', () => {
    expect(subtract(7, 0)).toBe(7);
  });

  it('soustrait un nombre à lui-même', () => {
    expect(subtract(5, 5)).toBe(0);
  });

  it('soustrait un plus grand nombre à un plus petit', () => {
    expect(subtract(3, 7)).toBe(-4);
  });

  it('soustrait des nombres à virgule', () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });
});

describe('Multiplication', () => {
  it('multiplie deux entiers positifs', () => {
    expect(multiply(2, 5)).toBe(10);
  });

  it('multiplie un entier par zéro', () => {
    expect(multiply(10, 0)).toBe(0);
  });

  it('multiplie deux négatifs', () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  it('multiplie un négatif et un positif', () => {
    expect(multiply(-2, 6)).toBe(-12);
  });

  it('multiplie des nombres à virgule', () => {
    expect(multiply(1.5, 2.0)).toBeCloseTo(3.0);
  });
});

describe('Division', () => {
  it('divise deux entiers positifs', () => {
    expect(divide(20, 4)).toBe(5);
  });

  it('divise un entier par 1', () => {
    expect(divide(10, 1)).toBe(10);
  });

  it('divise deux nombres à virgule', () => {
    expect(divide(4.5, 1.5)).toBeCloseTo(3);
  });

  it('divise un négatif par un positif', () => {
    expect(divide(-8, 2)).toBe(-4);
  });

  it('lance une erreur pour division par zéro', () => {
    expect(() => divide(5, 0)).toThrow('Division par zéro');
  });
});
