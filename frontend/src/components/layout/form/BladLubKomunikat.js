import React from 'react';
import InlineMessage from '../../reusable/InlineMessage';
import { withTheme } from 'styled-components';

function BladLubKomunikat({ error, postSuccess, theme }) {
   return (
      <>
         {!!Object.keys(error).length && (
            <InlineMessage
               isError={true}
               text={`Something went wrong. Try again. Message: \n${error.messages &&
                  error.messages.join('\n')}`}
               bigMargin
               textAlign="center"
            />
         )}
         {!!postSuccess && (
            <InlineMessage
               isError={false}
               text={'Zadanie dodano do bazy'}
               textAlign="center"
               fontSize={20}
               bigMargin
               bold
               color={theme.primaryColor}
            />
         )}
      </>
   );
}

export default withTheme(BladLubKomunikat);
