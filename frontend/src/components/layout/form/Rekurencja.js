import React from 'react';
import { RowWrapper } from '../../../styles/Form.js';
import Switch from '../../reusable/Switch';

export default function Rekurencja({ czyRekurencja, handleSwitchChange, color }) {
   return (
      <>
         <RowWrapper column>
            <h3>Zadanie wymaga rozwiązania rekurencyjnego</h3>
            <Switch
               onChange={handleSwitchChange('czyRekurencja')}
               value={czyRekurencja}
            />
         </RowWrapper>
      </>
   );
}
