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
         <RowWrapper leftMargin>
            <h2 variant="h6">Struktura funkcji</h2>
         </RowWrapper>
         <RowWrapper leftMargin>
            <h5>
               {nazwaFunkcji.length === 0 ||
               (isEmpty(args) && iloscArg !== 0) ||
               isEmpty(returnArgs) ? (
                  'int NazwaFunkcji(int A) - przykładowa nazwa - wypełnij wszystkie pola, aby wygenerować swoją'
               ) : (
                  <Span>{wygenerujStruktureFunkcji()}</Span>
               )}
            </h5>
         </RowWrapper>
      </>
   );
}
