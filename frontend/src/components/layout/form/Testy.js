import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withContext from '../../../context/Context_HOC';
import AddRemoveButtons from './AddRemoveButtons';
import { GridWrapper, RowWrapper } from '../../../styles/layout/Landing';
import Tooltip from '../../utils/Tooltip';
import Input from './Input';

const ArrayMarkers = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   position: relative;

   &::before {
      position: absolute;
      content: '[';
      font-size: 37px;
      left: -11px;
      top: 15px;
   }

   &::after {
      position: absolute;
      font-size: 37px;
      content: ']';
      left: 69px;
      top: 15px;
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
                     <Input
                        {...this.generateLabel(i, iloscArg)}
                        name={'imieINazwisko'}
                        value={wyniki[i] != undefined ? wyniki[i] : ''}
                        onChange={handleWynikiChange(i)}
                        small={true}
                     />
                  </ArrayMarkers>
               </Tooltip>
            );
         } else {
            fieldsArray.push(
               <div key={i}>
                  <Input
                     {...this.generateLabel(i, iloscArg)}
                     name={'imieINazwisko'}
                     value={wyniki[i] != undefined ? wyniki[i] : ''}
                     onChange={handleWynikiChange(i)}
                     small={true}
                  />
               </div>
            );
         }
      }

      return (
         <>
            <RowWrapper column>
               <h3>Zestawy testów i wartość zwracana</h3>
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
