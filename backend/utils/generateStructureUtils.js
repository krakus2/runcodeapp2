function isNumeric(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}

function escapeRegExp(str) {
   return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replaceArg) {
   return str.replace(new RegExp(escapeRegExp(find), 'g'), replaceArg);
}

const zmienNazwyTypow = typ => {
   let returnType = typ;
   if (returnType === 'long') returnType = 'int64';
   if (returnType === 'int') returnType = 'int32';
   if (returnType === 'short') returnType = 'int16';
   if (returnType === 'byte') returnType = 'uInt8';
   if (returnType === 'bool') returnType = 'boolean';
   return 'System.' + returnType.charAt(0).toUpperCase() + returnType.slice(1);
};

const returnValue = value => {
   if (typeof value !== 'string') return '';
   if (isNumeric(value)) {
      return Number(value);
   } else {
      return replaceAll(value, '"', '').trim();
   }
};

// prettier-ignore
//TODO - ta funkcja powinna sprawdzac, czy wszystkie elementy tablicy sa takiego samego typu
//TODO - DONE sprawdzic czy mozna przekazac na przyklad pusta tablice
const returnArrayValue = value => {
   if (typeof value !== 'string' || value.length === 0) return [];
   return value.split(',').map(elem => {
      if (isNumeric(elem)) {
         return Number(elem);
      } else {
         return replaceAll(elem, '\"', '').trim();
      }
   });
};

module.exports = {
   zmienNazwyTypow,
   returnValue,
   returnArrayValue
};
