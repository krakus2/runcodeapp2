const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
   let errors = {};
   if (isEmpty(data.imieINazwisko) || Validator.isEmpty(data.imieINazwisko)) {
      errors.imieINazwisko = 'Imię i nazwisko jest wymagane';
   }
   if (!errors.imieINazwisko) {
      if (!Validator.isLength(data.imieINazwisko, { min: 1, max: 80 })) {
         errors.imieINazwisko = 'Maksymalna długość imienia i nazwiska to 80 znaków';
      }
   }

   if (isEmpty(data.nazwaFunkcji) || Validator.isEmpty(data.nazwaFunkcji)) {
      errors.nazwaFunkcji = 'Nazwa funkcji jest wymagana';
   }

   if (!errors.nazwaFunkcji) {
      if (!Validator.isLength(data.nazwaFunkcji, { min: 1, max: 60 })) {
         errors.nazwaFunkcji = 'Maksymalna długość nazwy funkcji to 60 znaków';
      }
   }

   if (isEmpty(data.tytulZadania) || Validator.isEmpty(data.tytulZadania)) {
      errors.tytulZadania = 'Tytuł zadania jest wymagany';
   }
   if (!errors.tytulZadania) {
      if (!Validator.isLength(data.tytulZadania, { min: 1, max: 100 })) {
         errors.tytulZadania = 'Maksymalna długość tytułu to 100 znaków';
      }
   }

   if (isEmpty(data.opisZadania) || Validator.isEmpty(data.opisZadania)) {
      errors.opisZadania = 'Opis zadania jest wymagany';
   }
   if (!errors.opisZadania) {
      if (!Validator.isLength(data.opisZadania, { min: 5, max: 500 })) {
         errors.opisZadania = 'Minimalna długość opisu to 5, a maksymalna 500 znaków';
      }
   }

   if (isEmpty(data.code) || Validator.isEmpty(data.code)) {
      errors.code = 'Przykładowy kod zadania jest wymagany';
   }
   if (!errors.code) {
      if (!Validator.isLength(data.code, { min: 1, max: 10000 })) {
         errors.code = 'Maksymalna długość kodu to 10000 znaków';
      }
   }

   if (isEmpty(data.iloscArg)) {
      errors.iloscArg = 'Podaj ilość argumentów';
   }
   if (!errors.iloscArg) {
      if (data.iloscArg < 0 || data.iloscArg > 5) {
         errors.iloscArg =
            'Ilość argumentów nie może być mniejsza niż 0 oraz większa niż 5';
      }
   }

   if (isEmpty(data.iloscWynikow)) {
      errors.iloscWynikow = 'Wymagany jest przynajmniej 1 przykładowy wynik';
   }
   if (!errors.iloscWynikow) {
      if (data.iloscWynikow < 1) {
         errors.iloscWynikow = 'Ilość danych do testu nie może być mniejsza niż 1';
      }
   }

   if (isEmpty(data.args)) {
      errors.args = 'Typy paramtrów są wymagane';
   }

   if (isEmpty(data.returnArgs)) {
      errors.returnArgs = 'Typ zwracany przez funkcję jest wymagany';
   }
   //TODO - wywala sie blad przy probie dodania nowego taska z pustymi tablicami
   if (isEmpty(data.wyniki)) {
      errors.wyniki = 'Dane do testów są wymagane';
   }

   if (isEmpty(data.czyRekurencja)) {
      errors.czyRekurencja =
         'Określenie, czy w funkcji zachodzi rekurencja jest wymagane';
   }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};
