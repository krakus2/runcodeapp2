import React from 'react';
import InlineMessage from '../../utils/InlineMessage';

export default function BladLubKomunikat({ error, postSuccess }) {
   return (
      <>
         {!!Object.keys(error).length && (
            <InlineMessage
               isError={true}
               text={`Something went wrong. Try again. Message: \n${error.messages &&
                  error.messages.join('\n')}`}
            />
         )}
         {!!postSuccess && (
            <InlineMessage isError={false} text={'Zadanie dodano do bazy'} />
         )}
      </>
   );
}
