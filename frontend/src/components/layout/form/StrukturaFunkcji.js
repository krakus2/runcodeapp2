import React from 'react';
import { RowWrapper, Span } from '../../../styles/layout/Landing';

export default function StrukturaFunkcji({
   nazwaFunkcji,
   returnArgs,
   iloscArg,
   isEmpty,
   wygenerujStruktureFunkcji,
   args
}) {
   return (
      <>
         <RowWrapper>
            <h3>Struktura funkcji</h3>
         </RowWrapper>
         <RowWrapper>
            <h4 style={{ margin: 0, fontWeight: 400, fontSize: '17px' }}>
               {nazwaFunkcji.length === 0 ||
               (isEmpty(args) && iloscArg !== 0) ||
               isEmpty(returnArgs) ? (
                  'int NazwaFunkcji(int A) - przykładowa nazwa - wypełnij wszystkie pola, aby wygenerować swoją'
               ) : (
                  <Span>{wygenerujStruktureFunkcji()}</Span>
               )}
            </h4>
         </RowWrapper>
      </>
   );
}
