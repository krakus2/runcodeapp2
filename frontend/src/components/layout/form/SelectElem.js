import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Select from 'react-select';
import withContext from '../../../context/Context_HOC';
import { addAlphaChannel } from '../../../utils/utils';

class SelectElem extends Component {
   colourStyles = {
      control: styles => ({ ...styles, cursor: 'pointer' }),
      option: styles => ({ ...styles, cursor: 'pointer' }),
      input: (styles, { isDisabled, isFocused, isSelected }) => ({
         ...styles,
         width: this.props.context.isMobile ? '100%' : '100%',
         borderColor: isSelected ? 'red' : 'orange',
         minHeight: '35px',
         lineHeight: '35px',
         color: this.props.theme.color,
         cursor: 'pointer'
      }),
      placeholder: styles => ({
         ...styles,
         color: this.props.theme.placeholderColor,
         cursor: 'pointer'
      }),
      singleValue: styles => ({
         ...styles,
         color: this.props.theme.color,
         cursor: 'pointer'
      })
   };
   render() {
      //TODO - cos jest nie halo z wybieraniem opcji w selectcie, a szczegolnie z ich kasowaniem
      const {
         i,
         handleArgTypeChange,
         argsName,
         secondColumn,
         values,
         title,
         args
      } = this.props;
      let conditionalValue;
      if (secondColumn === true) {
         if (args[i * 2 + 1] === null || args[i * 2 + 1] === undefined) {
            conditionalValue = '';
         } else {
            conditionalValue = args[i * 2 + 1];
         }
      } else {
         if (args[i * 2 + 1] === null || args[i * 2] === undefined) {
            conditionalValue = '';
         } else {
            conditionalValue = args[i * 2];
         }
      }
      return (
         <Select
            label={title}
            placeholder={title}
            options={values.map(elem => ({ value: elem, label: elem }))}
            styles={this.colourStyles}
            theme={theme => ({
               ...theme,
               colors: {
                  ...theme.colors,
                  primary25: addAlphaChannel(this.props.theme.primaryColor, '0.2'),
                  primary50: addAlphaChannel(this.props.theme.primaryColor, '0.5'),
                  primary: this.props.theme.primaryColor,
                  neutral20: this.props.theme.inputBorderColor,
                  neutral30: this.props.theme.inputBorderColorHover
               }
            })}
            onChange={handleArgTypeChange(i)(secondColumn === true ? 1 : 0)(argsName)}
            isClearable
            value={
               conditionalValue !== '' && {
                  value: conditionalValue,
                  label: conditionalValue
               }
            }
         />
      );
   }
}

SelectElem.propTypes = {
   i: PropTypes.number.isRequired,
   handleArgTypeChange: PropTypes.func.isRequired,
   argsName: PropTypes.string.isRequired,
   secondColumn: PropTypes.bool.isRequired,
   values: PropTypes.array.isRequired,
   title: PropTypes.string.isRequired
};

export default withContext(withTheme(SelectElem));
