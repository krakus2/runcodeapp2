import React from 'react';
import MySlider from './MySlider';
import { SelectWrapper } from '../../../styles/Form';
import SelectElem from './SelectElem';

export default function Argumenty({
   iloscArg,
   handleArgTypeChange,
   args,
   handleSliderChange
}) {
   return (
      <>
         <MySlider handleSliderChange={handleSliderChange} iloscArg={iloscArg} max={5} />
         {Array.from(Array(iloscArg)).map((elem, i) => (
            <React.Fragment key={i}>
               <SelectWrapper last={i === iloscArg - 1}>
                  <SelectElem
                     i={i}
                     handleArgTypeChange={handleArgTypeChange}
                     args={args}
                     argsName={'args'}
                     secondColumn={false}
                     values={['Typ prosty', 'Tablica []']}
                     title={`Typ A argumentu ${i + 1}`}
                  />
                  <SelectElem
                     i={i}
                     handleArgTypeChange={handleArgTypeChange}
                     args={args}
                     argsName={'args'}
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
                     title={`Typ B argumentu ${i + 1}`}
                  />
               </SelectWrapper>
            </React.Fragment>
         ))}
      </>
   );
}
