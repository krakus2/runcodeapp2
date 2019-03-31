import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonStyles = styled.button`
   background-color: rgba(0, 0, 0, 0);
   z-index: 2;
   color: ${props => (props.color ? props.color : props.theme.primaryColor)};
   text-decoration: none;
   transition: 0.3s ease all;
   font-size: 18px;
   letter-spacing: 1.3px;
   text-transform: uppercase;
   display: inline-block;
   text-align: center;
   width: auto;
   font-family: Roboto;
   font-weight: 500;
   padding: ${props => (props.rounded ? '20px' : '11px 30px')};
   border: ${props =>
      props.color ? `2px solid ${props.color}` : `2px solid ${props.theme.primaryColor}`};
   border-radius: ${props => (props.rounded ? '50%' : '4px')};
   position: relative;
   /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1); */
   :disabled {
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.disabledStronger};
      color: ${props => props.theme.disabledStronger};
   }
   :before {
      transition: 0.5s all ease;
      position: absolute;
      top: 0;
      left: 50%;
      right: 50%;
      bottom: 0;
      opacity: 0;
      content: '';
      z-index: -3;
      background-color: ${props =>
         props.color ? props.color : props.theme.primaryColor};
   }
   :hover {
      ${props => !props.disabled && 'color: white'};
      cursor: pointer;
      :before {
         content: '';
         ${props => !props.disabled && 'left: 0'};
         ${props => !props.disabled && 'right: 0'};
         ${props => !props.disabled && 'opacity: 1'};
      }
   }
   :focus {
      ${props => !props.disabled && 'color: white'};
      :before {
         ${props =>
            !props.disabled && `background-color: ${props.theme.primaryColorDarker}`};
         ${props => !props.disabled && 'left: 0'};
         ${props => !props.disabled && 'right: 0'};
         ${props => !props.disabled && 'opacity: 1'};
      }
   }
`;

class Button extends React.Component {
   constructor() {
      super();
      this.myRef = React.createRef();
      this.blur = this.blur.bind(this);
   }

   blur() {
      this.myRef.current.blur();
   }
   render() {
      const { color, disabled, children, rounded, onClick } = this.props;
      return (
         <ButtonStyles
            color={color}
            disabled={disabled}
            ref={this.myRef}
            onMouseLeave={this.blur}
            rounded={rounded}
            onClick={onClick}
         >
            {children}
         </ButtonStyles>
      );
   }
}

Button.defaultProps = {};
Button.propTypes = {};

export default Button;
