const validateProfileInput = require('../../validators/task');
const sampleData = require('../../utils/sampleTestingData');
let taskData = { ...sampleData.taskData };
const taskDataError = { ...sampleData.taskDataError };
const taskDataErrors1 = { ...sampleData.taskDataErrors1 };
const taskDataErrors2 = { ...sampleData.taskDataErrors2 };
const taskDataErrors3 = { ...sampleData.taskDataErrors3 };
const taskDataErrors4 = { ...sampleData.taskDataErrors4 };
const taskDataErrors5 = { ...sampleData.taskDataErrors5 };
const taskDataErrors6 = { ...sampleData.taskDataErrors6 };

describe('validateProfileInput', () => {
   it('should return proper object if given data is in the right shape', () => {
      expect(validateProfileInput(taskData)).toEqual({ errors: {}, isValid: true });
   });

   it('should return error object', () => {
      expect(validateProfileInput(taskDataError)).toEqual({
         errors: { opisZadania: 'Minimalna długość opisu to 5, a maksymalna 500 znaków' },
         isValid: false
      });
   });
   it('should return error object 1', () => {
      expect(validateProfileInput(taskDataErrors1)).toEqual({
         errors: {
            imieINazwisko: 'Imię i nazwisko jest wymagane',
            tytulZadania: 'Tytuł zadania jest wymagany',
            nazwaFunkcji: 'Nazwa funkcji jest wymagana',
            opisZadania: 'Minimalna długość opisu to 5, a maksymalna 500 znaków',
            code: 'Przykładowy kod zadania jest wymagany',
            iloscArg: 'Ilość argumentów nie może być mniejsza niż 0 oraz większa niż 5',
            iloscWynikow: 'Ilość danych do testu nie może być mniejsza niż 1',
            args: 'Typy paramtrów są wymagane',
            returnArgs: 'Typ zwracany przez funkcję jest wymagany',
            wyniki: 'Dane do testów są wymagane',
            czyRekurencja: 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane'
         },
         isValid: false
      });
   });

   it('should return error object 2', () => {
      expect(validateProfileInput(taskDataErrors2)).toEqual({
         errors: {
            imieINazwisko: 'Maksymalna długość imienia i nazwiska to 80 znaków',
            tytulZadania: 'Maksymalna długość tytułu to 100 znaków',
            nazwaFunkcji: 'Maksymalna długość nazwy funkcji to 60 znaków',
            opisZadania: 'Minimalna długość opisu to 5, a maksymalna 500 znaków',
            code: 'Przykładowy kod zadania jest wymagany',
            iloscArg: 'Ilość argumentów nie może być mniejsza niż 0 oraz większa niż 5',
            iloscWynikow: 'Ilość danych do testu nie może być mniejsza niż 1',
            args: 'Typy paramtrów są wymagane',
            returnArgs: 'Typ zwracany przez funkcję jest wymagany',
            wyniki: 'Dane do testów są wymagane',
            czyRekurencja: 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane'
         },
         isValid: false
      });
   });
   it('should return error object 3', () => {
      expect(validateProfileInput(taskDataErrors3)).toEqual({
         errors: {
            imieINazwisko: 'Imię i nazwisko jest wymagane',
            tytulZadania: 'Tytuł zadania jest wymagany',
            nazwaFunkcji: 'Nazwa funkcji jest wymagana',
            opisZadania: 'Opis zadania jest wymagany',
            code: 'Przykładowy kod zadania jest wymagany',
            iloscArg: 'Podaj ilość argumentów',
            iloscWynikow: 'Wymagany jest przynajmniej 1 przykładowy wynik',
            args: 'Typy paramtrów są wymagane',
            returnArgs: 'Typ zwracany przez funkcję jest wymagany',
            wyniki: 'Dane do testów są wymagane',
            czyRekurencja: 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane'
         },
         isValid: false
      });
   });
   it('should return error object 4', () => {
      expect(validateProfileInput(taskDataErrors4)).toEqual({
         errors: {
            imieINazwisko: 'Imię i nazwisko jest wymagane',
            tytulZadania: 'Tytuł zadania jest wymagany',
            nazwaFunkcji: 'Nazwa funkcji jest wymagana',
            opisZadania: 'Opis zadania jest wymagany',
            code: 'Przykładowy kod zadania jest wymagany',
            iloscArg: 'Podaj ilość argumentów',
            iloscWynikow: 'Wymagany jest przynajmniej 1 przykładowy wynik',
            args: 'Typy paramtrów są wymagane',
            returnArgs: 'Typ zwracany przez funkcję jest wymagany',
            wyniki: 'Dane do testów są wymagane',
            czyRekurencja: 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane'
         },
         isValid: false
      });
   });
   it('should return error object 5', () => {
      expect(validateProfileInput(taskDataErrors5)).toEqual({
         errors: {
            imieINazwisko: 'Imię i nazwisko jest wymagane',
            tytulZadania: 'Tytuł zadania jest wymagany',
            nazwaFunkcji: 'Nazwa funkcji jest wymagana',
            opisZadania: 'Opis zadania jest wymagany',
            code: 'Przykładowy kod zadania jest wymagany',
            iloscArg: 'Podaj ilość argumentów',
            iloscWynikow: 'Wymagany jest przynajmniej 1 przykładowy wynik',
            args: 'Typy paramtrów są wymagane',
            returnArgs: 'Typ zwracany przez funkcję jest wymagany',
            wyniki: 'Dane do testów są wymagane',
            czyRekurencja: 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane'
         },
         isValid: false
      });
   });
   it('should return error object 6', () => {
      expect(validateProfileInput(taskDataErrors6)).toEqual({
         errors: {
            imieINazwisko: 'Imię i nazwisko jest wymagane',
            tytulZadania: 'Tytuł zadania jest wymagany',
            nazwaFunkcji: 'Nazwa funkcji jest wymagana',
            opisZadania: 'Opis zadania jest wymagany',
            code: 'Przykładowy kod zadania jest wymagany',
            iloscArg: 'Podaj ilość argumentów',
            iloscWynikow: 'Wymagany jest przynajmniej 1 przykładowy wynik',
            args: 'Typy paramtrów są wymagane',
            returnArgs: 'Typ zwracany przez funkcję jest wymagany',
            czyRekurencja: 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane'
         },
         isValid: false
      });
   });
});
