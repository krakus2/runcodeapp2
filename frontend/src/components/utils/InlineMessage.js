import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

const InlineMessage = ({ text, isError, bigMargin, theme }) => (
   <div
      style={{
         color: isError ? theme.errorColor : theme.primaryColor,
         fontSize: isError ? '15px' : '20px',
         fontWeight: isError ? '400' : '600',
         width: 'auto',
         maxWidth: '515px',
         margin: bigMargin ? '5px auto 0 auto' : '0px',
         textAlign: 'center'
         /*whiteSpace: 'pre'*/
      }}
   >
      {text}
   </div>
);

InlineMessage.propTypes = {
   isError: PropTypes.bool.isRequired,
   bigMargin: PropTypes.bool,
   text: PropTypes.string.isRequired
};

export default withTheme(InlineMessage);
