import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InlineMessageStyles = styled.div`
   color: ${props =>
      props.isError
         ? props.theme.errorColor
         : props.color
         ? props.color
         : props.theme.lighterColor};
   font-size: ${props =>
      !!props.fontSize ? `${props.fontSize}px` : props.theme.defaultFontSize};
   font-weight: ${props => (props.bold ? '600' : '400')};
   width: auto;
   margin: ${props => (props.bigMargin ? '20px 0 0 0' : '0px')};
   text-align: ${props => props.textAlign};
`;

const InlineMessage = ({
   text,
   isError,
   bigMargin,
   textAlign,
   fontSize,
   bold,
   color
}) => (
   <InlineMessageStyles
      isError={isError}
      bigMargin={bigMargin}
      textAlign={textAlign}
      fontSize={fontSize}
      bold={bold}
      color={color}
   >
      {text}
   </InlineMessageStyles>
);
InlineMessage.defaultProps = {
   textAlign: 'left',
   bigMargin: false,
   bold: false
};

InlineMessage.propTypes = {
   isError: PropTypes.bool.isRequired,
   text: PropTypes.string.isRequired,
   bold: PropTypes.bool,
   bigMargin: PropTypes.bool,
   textAlign: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.number
};

export default InlineMessage;
