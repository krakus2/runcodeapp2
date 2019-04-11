import React from 'react';
import { withTheme } from 'styled-components';
import Input from '../../reusable/Input';
import { RowWrapper } from '../../../styles/Form';

const PolaTekstowe = ({
   error,
   handleTextInputChange,
   imieINazwisko,
   tytulZadania,
   nazwaFunkcji,
   opisZadania,
   zlaNazwaFunkcji,
   //context
   theme
}) => {
   return (
      <RowWrapper>
         <Input
            name={'imieINazwisko'}
            label="Imię i Nazwisko"
            value={imieINazwisko}
            onChange={handleTextInputChange('imieINazwisko')}
            error={error.types && error.types.some(elem => elem === 'imieINazwisko')}
            message="Podaj imię i nazwisko - autorzy najciekawszych zadań otrzymają punkty
            bonusowe zwiększające ocenę końcową z przedmiotu Wstęp do programowania."
            margin="0 0 10px 0"
            width="100%"
         />
         <Input
            name={'tytulZadania'}
            label="Tytuł zadania"
            placeholder="Wyszukiwanie liczb"
            value={tytulZadania}
            onChange={handleTextInputChange('tytulZadania')}
            error={error.types && error.types.some(elem => elem === 'tytulZadania')}
            message="Nadaj zadaniu odpowiedni tytuł."
            margin="0 0 10px 0"
            width="100%"
         />
         <Input
            name={'nazwaFunkcji'}
            label="Nazwa funkcji"
            value={nazwaFunkcji}
            onChange={handleTextInputChange('nazwaFunkcji')}
            error={
               (error.types && error.types.some(elem => elem === 'nazwaFunkcji')) ||
               zlaNazwaFunkcji
            }
            message="Podaj nazwę funkcji, która ma zostać stworzona, np. ZnajdzLiczbe lub
               SzukajWTablicy. Uwaga: Nazwa nie może zawierać spacji, znaków specjalnych
               oraz zaczynać się od cyfry."
            margin="0 0 10px 0"
            width="100%"
         />
         <Input
            name={'opisZadania'}
            textarea
            rows="6"
            label="Opis Zadania"
            value={opisZadania}
            onChange={handleTextInputChange('opisZadania')}
            error={error.types && error.types.some(elem => elem === 'opisZadania')}
            message="Tu wpisz treść zadania, podając co najmniej nazwę funkcji do utworzenia,
               określając jej parametry i definiując jej wymagania np.: Stwórz funkcję int
               ZwrocPodwojona(int a). Funkcja zwraca podwojoną wartość liczby a."
            margin="0 0 10px 0"
            width="100%"
         />
      </RowWrapper>
   );
};

export default withTheme(PolaTekstowe);
