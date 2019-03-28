import React from 'react';
//import { TextField } from 'react-md';
//import withContext from "../../../context/Context_HOC";
//import TextField from '@atlaskit/field-text';
import {
   TextField,
   Label,
   Input,
   Message,
   Textarea
} from '@zendeskgarden/react-textfields';
import '../../../sass_styles/text-field.scss';

const PolaTekstowe = ({
   error,
   handleTextInputChange,
   imieINazwisko,
   tytulZadania,
   nazwaFunkcji,
   opisZadania,
   zlaNazwaFunkcji
   //context
}) => {
   /* TODO - helper sie łamie przy dlugosci > 9 */
   return (
      <>
        {/*  <TextField>
            <Label>Imię i Nazwisko</Label>
            <Input
               validation={
                  error.types &&
                  error.types.some(elem => elem === 'imieINazwisko') &&
                  'error'
               }
               value={imieINazwisko}
               onChange={handleTextInputChange('imieINazwisko')}
            />
            <Message
               validation={
                  error.types &&
                  error.types.some(elem => elem === 'imieINazwisko') &&
                  'error'
               }
            >
               Podaj imię i nazwisko - autorzy najciekawszych zadań otrzymają punkty
               bonusowe zwiększające ocenę końcową z przedmiotu Wstęp do programowania.
            </Message>
         </TextField>
         <TextField>
            <Label>Tytuł zadania</Label>
            <Input
               validation={
                  error.types &&
                  error.types.some(elem => elem === 'tytulZadania') &&
                  'error'
               }
               placeholder="Wyszukiwanie liczb"
               value={tytulZadania}
               onChange={handleTextInputChange('tytulZadania')}
            />
            <Message
               validation={
                  error.types &&
                  error.types.some(elem => elem === 'tytulZadania') &&
                  'error'
               }
            >
               Nadaj zadaniu odpowiedni tytuł
            </Message>
         </TextField>
         <TextField>
            <Label>Nazwa funkcji</Label>
            <Input
               validation={
                  error.types &&
                  error.types.some(elem => elem === 'nazwaFunkcji') &&
                  'error'
               }
               value={nazwaFunkcji}
               onChange={handleTextInputChange('nazwaFunkcji')}
            />
            <Message
               validation={
                  error.types &&
                  error.types.some(elem => elem === 'nazwaFunkcji') &&
                  'error'
               }
            >
               Podaj nazwę funkcji, która ma zostać stworzona, np. ZnajdzLiczbe lub
               SzukajWTablicy. Uwaga: Nazwa nie może zawierać spacji, znaków specjalnych
               oraz zaczynać się od cyfry.
            </Message>
         </TextField>
         <TextField>
            <Label>Opis zadania</Label>
            <Textarea
               validation={
                  error.types &&
                  error.types.some(elem => elem === 'opisZadania') &&
                  'error'
               }
               value={opisZadania}
               onChange={handleTextInputChange('opisZadania')}
            />
            <Message
               validation={
                  error.types &&
                  error.types.some(elem => elem === 'opisZadania') &&
                  'error'
               }
            >
               Tu wpisz treść zadania, podając co najmniej nazwę funkcji do utworzenia,
               określając jej parametry i definiując jej wymagania np.: Stwórz funkcję int
               ZwrocPodwojona(int a). Funkcja zwraca podwojoną wartość liczby a.
            </Message>
         </TextField> */}

         <TextField
            id="imieINazwisko"
            label="Imię i Nazwisko"
            error={error.types && error.types.some(elem => elem === 'imieINazwisko')}
            helpText={`Podaj imię i nazwisko - autorzy najciekawszych zadań otrzymają punkty bonusowe
               zwiększające ocenę końcową z przedmiotu Wstęp do programowania.`}
            className="md-cell md-cell--top my-text-field"
            value={imieINazwisko}
            onChange={handleTextInputChange('imieINazwisko')}
            maxLength={80}
            customSize="title"
         />
         <TextField
            id="tytulZadania"
            label="Tytuł zadania"
            error={error.types && error.types.some(elem => elem === 'tytulZadania')}
            placeholder="Wyszukiwanie liczb"
            helpText="Nadaj zadaniu odpowiedni tytuł"
            className="md-cell md-cell--top my-text-field"
            value={tytulZadania}
            onChange={handleTextInputChange('tytulZadania')}
            maxLength={100}
            customSize="title"
         />
         <TextField
            id="nazwaFunkcji"
            label="Nazwa funkcji"
            error={
               (error.types && error.types.some(elem => elem === 'nazwaFunkcji')) ||
               zlaNazwaFunkcji
            }
            helpText="Podaj nazwę funkcji, która ma zostać stworzona,
            np. ZnajdzLiczbe lub SzukajWTablicy. Uwaga: Nazwa nie może zawierać spacji,
            znaków specjalnych oraz zaczynać się od cyfry."
            className="md-cell md-cell--top my-text-field"
            value={nazwaFunkcji}
            onChange={handleTextInputChange('nazwaFunkcji')}
            maxLength={60}
            customSize="title"
         />
         <TextField
            id="opisZadania"
            label="Opis zadania"
            rows={4}
            error={error.types && error.types.some(elem => elem === 'opisZadania')}
            helpText="Tu wpisz treść zadania, podając co najmniej nazwę funkcji do utworzenia,
               określając jej parametry i definiując jej wymagania np.: Stwórz funkcję int
               ZwrocPodwojona(int a). Funkcja zwraca podwojoną wartość liczby a."
            className="md-cell md-cell--top my-text-area"
            value={opisZadania}
            onChange={handleTextInputChange('opisZadania')}
            maxLength={500}
            customSize="title"
         /> 
      </>
   );
};

export default PolaTekstowe;
