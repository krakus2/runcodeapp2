import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'react-md';
import styled from 'styled-components';
import withContext from '../../../context/Context_HOC';
import AddRemoveButtons from './AddRemoveButtons';
import { GridWrapper, RowWrapper } from '../../../styles/layout/Landing';
import Tooltip from '../../utils/Tooltip';

const ArrayMarkers = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   position: relative;

   &::before {
      position: absolute;
      content: '[';
      font-size: 34px;
      left: -3px;
      top: -2px;
   }

   &::after {
      position: absolute;
      font-size: 34px;
      content: ']';
      left: 63px;
      top: -2px;
   }
`;

class Testy extends Component {
   generateGrid = number => {
      const array = [];
      for (let i = 0; i < number; i++) {
         array.push('70px');
      }
      return array.join(' ');
   };

   generateLabel = (i, iloscArg) => {
      const object = {};
      if (i === 0 && iloscArg === 0) {
         object.label = 'Wynik';
      } else if ((i + 1) % (iloscArg + 1) === 0 && i !== 0) {
         object.label = 'Wynik';
      } else {
         object.label = `Arg ${(i % (iloscArg + 1)) + 1}`;
      }
      return object;
   };

   render() {
      const {
         handleWynikiChange,
         zmienIloscWynikow,
         iloscWynikow,
         iloscArg,
         wyniki,
         indeksyTablic,
         context
      } = this.props;
      const fieldsArray = [];

      for (var i = 0; i < iloscWynikow * (iloscArg + 1); i++) {
         if (indeksyTablic.some(el => el === i)) {
            fieldsArray.push(
               <Tooltip key={i} title="Wartości tablicy oddziel przecinkami">
                  <ArrayMarkers key={i}>
                     <TextField
                        id={Math.random()}
                        className={`md-cell md-cell--top ${
                           (i + 1) % (iloscArg + 1) === 0
                              ? 'text-field-testy--wynik'
                              : 'text-field-testy'
                        }`}
                        key={i}
                        {...this.generateLabel(i, iloscArg)}
                        value={wyniki[i] != undefined ? wyniki[i] : ''}
                        onChange={handleWynikiChange(i)}
                        style={{
                           top: context.isMobile ? '-31px' : '-24px',
                           width: context.isMobile ? '74%' : '80%'
                        }}
                     />
                  </ArrayMarkers>
               </Tooltip>
            );
         } else {
            fieldsArray.push(
               <div key={i}>
                  <TextField
                     id={Math.random()}
                     className={`md-cell md-cell--top ${
                        (i + 1) % (iloscArg + 1) === 0
                           ? 'text-field-testy--wynik'
                           : 'text-field-testy'
                     }`}
                     key={i}
                     {...this.generateLabel(i, iloscArg)}
                     value={wyniki[i] != undefined ? wyniki[i] : ''}
                     onChange={handleWynikiChange(i)}
                     style={{
                        top: context.isMobile ? '-31px' : '-24px',
                        width: context.isMobile ? '74%' : '80%'
                     }}
                  />
               </div>
            );
         }
      }

      return (
         <>
            <RowWrapper column leftMargin>
               <h2>Zestawy testów i wartość zwracana</h2>
               <p>
                  Zdefiniuj testy. Podaj wartości parametrów wywołania funkcji oraz
                  wartość zwracaną przez funkcję dla tych parametrów.
               </p>
            </RowWrapper>
            <GridWrapper
               isMobile={context.isMobile}
               grid={this.generateGrid(iloscArg + 1)}
            >
               {fieldsArray}
            </GridWrapper>
            <AddRemoveButtons
               zmienIloscWynikow={zmienIloscWynikow}
               iloscWynikow={iloscWynikow}
            />
         </>
      );
   }
}

Testy.propTypes = {
   handleWynikiChange: PropTypes.func.isRequired,
   iloscWynikow: PropTypes.number.isRequired,
   iloscArg: PropTypes.number.isRequired,
   wyniki: PropTypes.array.isRequired
};

export default withContext(Testy);
