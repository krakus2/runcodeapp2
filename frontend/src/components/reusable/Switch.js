import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { addAlphaChannel } from '../../utils/utils';

const SwitchStyles = styled.div`
   display: inline-block;
   position: relative;
   margin: 0 0 10px;
   font-size: 16px;
   line-height: 24px;
   height: 25px;
   margin-top: 10px;

   .switch__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 20px;
      opacity: 0;
      z-index: 0;
   }
   .switch__label {
      display: block;
      padding: 0 0 0 44px;
      cursor: pointer;
   }
   .switch__label:before {
      content: '';
      position: absolute;
      top: 5px;
      left: 0;
      width: 36px;
      height: 14px;
      background-color: rgba(0, 0, 0, 0.26);
      border-radius: 14px;
      z-index: 1;
      transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
   }
   .switch__label:after {
      content: '';
      position: absolute;
      top: 2px;
      left: 0;
      width: 20px;
      height: 20px;
      background-color: #fff;
      border-radius: 14px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
         0 1px 5px 0 rgba(0, 0, 0, 0.12);
      z-index: 2;
      transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: left, background-color;
   }
   .switch__input:checked + .switch__label:before {
      background-color: ${props =>
         props.color
            ? `rgba(${props.color}, 0.5)`
            : addAlphaChannel(props.theme.primaryColor, '0.5')};
   }
   .switch__input:checked + .switch__label:after {
      left: 16px;
      background-color: ${props =>
         props.color
            ? `rgba(${props.color}, 1)`
            : addAlphaChannel(props.theme.primaryColor, '1')};
   }
`;

const Switch = ({ text, color, value, onChange }) => (
   <SwitchStyles color={color}>
      <input
         type="checkbox"
         id="switch1"
         className="switch__input"
         checked={value}
         onChange={onChange}
      />
      <label htmlFor="switch1" className="switch__label">
         {text}
      </label>
   </SwitchStyles>
);

Switch.defaultProps = {};

Switch.propTypes = {
   color: PropTypes.string
};

export default Switch;
