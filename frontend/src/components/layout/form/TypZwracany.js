import React from 'react';
import { RowWrapper } from '../../../styles/layout/Landing';
import SelectElem from './SelectElem';

export default function TypZwracany({ handleArgTypeChange, returnArgs }) {
   return (
      <>
         <RowWrapper leftMargin>
            <h2>Typ zwracany</h2>
         </RowWrapper>
         <RowWrapper topMargin40>
            <SelectElem
               i={0}
               handleArgTypeChange={handleArgTypeChange}
               args={returnArgs}
               argsName={'returnArgs'}
               secondColumn={false}
               values={['Typ prosty', 'Tablica []']}
               title={`Typ zwracany A`}
            />
            <SelectElem
               i={0}
               handleArgTypeChange={handleArgTypeChange}
               args={returnArgs}
               argsName={'returnArgs'}
               secondColumn={true}
               values={[
                  'int',
                  'double',
                  'float',
                  'decimal',
                  'long',
                  'short',
                  'string',
                  'char',
                  'bool',
                  'byte'
               ]}
               title={`Typ zwracany B`}
            />
         </RowWrapper>
      </>
   );
}
