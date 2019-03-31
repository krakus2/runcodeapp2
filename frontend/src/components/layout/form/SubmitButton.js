import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../utils/Tooltip';
import Button from './Button';
import { ButtonWrapper } from '../../../styles/layout/Landing';

const styles = theme => ({
   button: {
      margin: theme.spacing.unit,
      fontSize: '16px',
      width: '125px'
   }
});

const Submit = ({ isInvalid, loading, onSubmitClick, classes, isMobile }) => (
   <ButtonWrapper isMobile={isMobile}>
      {isInvalid ? (
         <Tooltip title={`Wypełnij wszystkie obowiązkowe pola, aby przesłać zadanie`}>
            <div>
               <Button
                  type="submit"
                  onClick={onSubmitClick}
                  disabled
                  /* style={{ height: '42px', width: '120px', fontSize: '16px' }} */
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
            raised
            primary
            type="submit"
            onClick={onSubmitClick}
            style={{ height: '42px', width: '120px', fontSize: '16px' }}
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

export default Submit;
