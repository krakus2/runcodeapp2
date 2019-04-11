import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const ButtonStyles = styled.button`
   background-color: ${props => props.theme.secondaryColor};
   color: white;
   border: ${props =>
      props.color
         ? `2px solid ${props.color}`
         : `2px solid ${props.theme.secondaryColor}`};

   z-index: 2;
   text-decoration: none;
   transition: width 0.3s ease;
   font-size: ${props => props.fontSize};
   letter-spacing: 1.1px;
   text-transform: uppercase;
   display: inline-block;
   text-align: center;
   width: auto;
   font-family: Roboto;
   font-weight: 500;
   padding: 0 30px;
   height: ${props => props.height};
   @media (min-width: 900px) {
      position: relative;
      top: ${props => props.top};
   }
   margin: ${props => props.margin};
   border-radius: 4px;

   outline: none;
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
      border-color: ${props => !props.disabled && props.theme.primaryColor};
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
      const {
         color,
         disabled,
         children,
         type,
         onClick,
         height,
         fontSize,
         top,
         margin,
         isMobile
      } = this.props;
      return (
         <ButtonStyles
            color={color}
            disabled={disabled}
            ref={this.myRef}
            onMouseLeave={this.blur}
            onClick={onClick}
            type={type}
            height={height}
            fontSize={fontSize}
            top={top}
            margin={margin}
            isMobile={isMobile}
         >
            {children}
         </ButtonStyles>
      );
   }
}

Button.defaultProps = {
   type: 'button',
   disabled: false,
   height: '48px',
   fontSize: '20px',
   top: '0',
   margin: '0',
   isMobile: false
};
Button.propTypes = {
   type: PropTypes.string,
   disabled: PropTypes.bool,
   color: PropTypes.string,
   height: PropTypes.string,
   fontSize: PropTypes.string,
   top: PropTypes.string,
   margin: PropTypes.string,
   isMobile: PropTypes.bool
};

export default Button;
