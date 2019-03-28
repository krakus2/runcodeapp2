import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import withContext from '../../context/Context_HOC';

const beforeSlideIn = isMobile => {
   if (!isMobile) {
      return keyframes`
         from {
            transform: translateX(-70%);
            background-color: rgba(0, 0, 0, 0);
         }
         to {
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
         }
      `;
   }
};

/* const beforeSlideIn = keyframes`
  from {
   transform: translateX(-100%);
   background-color: rgba(0, 0, 0, 0);
  }
  to {
   transform: translateX(-50%);
   background-color: rgba(0, 0, 0, 0.8);
  }
`; */

const afterSlide = isMobile => {
   if (!isMobile) {
      return keyframes`
         from {
            transform: translateX(-300%);
            border-top-color: rgba(0, 0, 0, 0);
         }
         to {
            transform: translateX(0);
            border-top-color: rgba(0, 0, 0, 0.8);
         }
      `;
   }
};

const TooltipStyle = styled.div`
   /* The element is positioned relative to its normal position */
   position: relative;
   text-align: center;
   &:hover {
      &::after{
         ${props => !props.isMobile && 'display: block'};
         ${props => !props.isMobile && 'border-top-color: rgba(0, 0, 0, 0.8)'}; 
         animation: ${props => afterSlide(props.isMobile)} 0.25s ease-out; 
      }
      &::before {
         ${props => !props.isMobile && 'display: block'};
         ${props => !props.isMobile && 'background-color: rgba(0, 0, 0, 0.8)'}; 
         animation: ${props => beforeSlideIn(props.isMobile)} 0.3s ease-out;  
      }
   }
   &::before {
      /* The element is positioned relative to its first positioned (not static) ancestor element */
      position: absolute;
      display: none;
      background-color: rgba(0, 0, 0, 0.8); 
      transform: translateX(-50%);
      white-space: pre;
      padding: 0 10px;
      height: ${props => (props.isMobile ? '20px' : '30px')};
      line-height: ${props => (props.isMobile ? '20px' : '30px')};
      content: '${props => props.title}';
      font-size: ${props => (props.isMobile ? '10px' : '14px')};
      font-weight: 500;
      border-radius: 4px;
      color: white;
      z-index: 2;
      /* te jednostki procentowe zalezy od tego czy element jest position relative, czy absolute
      jesl absolute, to odnosza sie do wymiarow swojego rodzica */
      bottom: calc(90% + 10px);
      left: 50%;
      /* dzieki temu, hover znika po wyjechaniu z "bazowego" elementu
      bez tego hover dzialal nawet po wjechaniu na pseudo-element before i after */
      pointer-events: none;
      /* optymalizacja pod konkretna animacje */
      will-change: transform;
   }
 
   &::after{
      position: absolute;
      display: none;
      z-index: 1;
      width: 0;
      height: 0;
      /* ten trojkat bedzie mial wymiary 10px x 10px */
      border: 5px solid transparent;
      content: "";
      bottom: 90%;
      left: calc(50% - 5px);
      transform: translateX(0);
      pointer-events: none;
      will-change: transform;
   }

`;

const Tooltip = ({ children, title, width, context }) => (
   <TooltipStyle title={title} isMobile={context.isMobile}>
      {children}
   </TooltipStyle>
);

Tooltip.propTypes = {
   title: PropTypes.string.isRequired
};

export default withContext(Tooltip);
