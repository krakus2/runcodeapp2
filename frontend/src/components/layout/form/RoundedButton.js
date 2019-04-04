import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RoundedButtonStyles = styled.button`
   position: relative;
   width: 40px;
   height: 40px;
   font-size: 28px;
   display: block;
   padding: 0;
   overflow: hidden;
   border-width: 0;
   outline: none;
   border-radius: 50%;
   ${props =>
      !props.disabled &&
      `box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)`};
   background-color: ${props => (props.color ? props.color : props.theme.primaryColor)};
   color: #ecf0f1;
   margin: 0 10px;
   transition: background-color 0.3s;
   :disabled {
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.disabledStronger};
      color: ${props => props.theme.disabledStronger};
   }
   :before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 0;
      padding-top: 0;
      border-radius: 100%;
      background-color: rgba(236, 240, 241, 0.3);
      transform: translate(-50%, -50%);
   }
   /* TODO - dodac jakas funkcje, ktora bedzie sciemniac podany kolor */
   :hover {
      background-color: ${props =>
         !props.disabled && (props.color ? 'blue' : props.theme.primaryColorDarker)};
      cursor: pointer;
   }
   :focus {
      background-color: ${props =>
         props.color ? props.color : props.theme.primaryColorDarker};
   }

   & > * {
      position: relative;
   }

   :active {
      :before {
         width: 120%;
         padding-top: 120%;

         transition: width 0.2s ease-out, padding-top 0.2s ease-out;
      }
   }
`;

class RoundedButton extends React.Component {
   constructor() {
      super();
      this.myRef = React.createRef();
      this.blur = this.blur.bind(this);
   }

   blur() {
      this.myRef.current.blur();
   }
   render() {
      const { color, disabled, children, onClick } = this.props;
      return (
         <RoundedButtonStyles
            type="button"
            color={color}
            disabled={disabled}
            ref={this.myRef}
            onMouseLeave={this.blur}
            onClick={onClick}
         >
            {children}
         </RoundedButtonStyles>
      );
   }
}

RoundedButton.defaultProps = {};
RoundedButton.propTypes = {};

export default RoundedButton;
