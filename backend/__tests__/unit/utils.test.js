const utils = require('../../utils/generateStructureUtils');
const { zmienNazwyTypow, returnValue, returnArrayValue } = utils;
const sampleTestingData = require('../../utils/sampleTestingData');
const { types, utilsData1, utilsData2 } = sampleTestingData;

describe.each(types)('zmien nazwy typow - from %s return %s', (types, expected) => {
   it(`returns ${expected}`, () => {
      expect(zmienNazwyTypow(types)).toEqual(expected);
   });
});

describe('returnValue i returnArrayValue', () => {
   it('function returnValue should return properly converted string or numeric value', () => {
      for (let i = 0; i < utilsData1.length; i = i + 2) {
         expect(returnValue(utilsData1[i])).toBe(utilsData1[i + 1]);
      }
   });
   it('function returnArrayValue should return properly converted array value', () => {
      for (let i = 0; i < utilsData2.length; i = i + 2) {
         expect(returnArrayValue(utilsData2[i])).toEqual(utilsData2[i + 1]);
      }
   });
});
