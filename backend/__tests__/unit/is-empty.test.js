const isEmpty = require('../../validators/is-empty');

describe('is-empty', () => {
   it('should return true if given argument is some kind of falsy value', () => {
      expect(isEmpty({})).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty(null)).toBe(true);
   });

   it('should return false otherwise', () => {
      expect(isEmpty({ a: 'a', b: 'b' })).toBe(false);
      expect(isEmpty(' r rr ')).toBe(false);
      expect(isEmpty('  a ')).toBe(false);
      expect(isEmpty([1, , , 3, 4])).toBe(false);
      expect(isEmpty(132)).toBe(false);
      expect(isEmpty({ x: undefined })).toBe(false);
      expect(isEmpty({ y: null })).toBe(false);
   });
});
