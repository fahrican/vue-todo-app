import {expect, describe, it} from 'vitest'
import {formattedDate} from "../../src/composables/formattedDate";


describe('formattedDate Unit Tests', () => {
  it('formattedDate formats date correctly', () => {
    const date1 = '2022-12-31';
    const expected1 = '12.31.2022';
    const result1 = formattedDate(date1)

    const date2 = '2024-01-01'
    const expected2 = '01.01.2024';
    const result2 = formattedDate(date2);

    expect(result1).toBe(expected1);
    expect(result2).toBe(expected2);
  });

  it('formattedDate returns empty string for invalid date', () => {
    const invalidDate = 'invalid-date';
    const result = formattedDate(invalidDate);
    expect(result).toBe('');
  })
});
