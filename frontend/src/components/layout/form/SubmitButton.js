import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../utils/Tooltip';
import Button from './Button';
import { ButtonWrapper } from '../../../styles/layout/Landing';
import withContext from '../../../context/Context_HOC';

const Submit = ({ isInvalid, loading, onSubmitClick, context }) => (
   <ButtonWrapper isMobile={context.isMobile}>
      {isInvalid ? (
         <Tooltip title={`Wypełnij wszystkie obowiązkowe pola, aby przesłać zadanie`}>
            <div>
               <Button
                  type="submit"
                  onClick={onSubmitClick}
                  disabled
                  height={context.isMobile ? '44px' : undefined}
                  fontSize={context.isMobile ? '18px' : undefined}
               >
                  {loading ? (
                     <div className="lds-ring">
                        <div />
                        <div />
                        <div />
                        <div />
                     </div>
                  ) : (
                     'Prześlij'
                  )}
               </Button>
            </div>
         </Tooltip>
      ) : (
         <Button
            type="submit"
            onClick={onSubmitClick}
            height={context.isMobile ? '44px' : undefined}
            fontSize={context.isMobile ? '18px' : undefined}
         >
            {loading ? (
               <div className="lds-ring">
                  <div />
                  <div />
                  <div />
                  <div />
               </div>
            ) : (
               'Prześlij'
            )}
         </Button>
      )}
   </ButtonWrapper>
);
Submit.propTypes = {
   isInvalid: PropTypes.bool.isRequired
};

export default withContext(Submit);
