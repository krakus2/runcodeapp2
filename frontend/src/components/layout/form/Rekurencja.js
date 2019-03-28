import React from 'react';
import { RowWrapper } from '../../../styles/layout/Landing.js';
//TODO - wyjebac switcha
import { SelectionControl } from 'react-md';
import Switch from '../../utils/Switch';

export default function Rekurencja({ czyRekurencja, handleSwitchChange, color }) {
   return (
      <>
         <RowWrapper leftMargin>
            <h2>Zadanie wymaga rozwiązania rekurencyjnego</h2>
         </RowWrapper>
         <RowWrapper leftMargin>
            <Switch
               onChange={handleSwitchChange('czyRekurencja')}
               value={czyRekurencja}
            />
         </RowWrapper>
      </>
   );
}
