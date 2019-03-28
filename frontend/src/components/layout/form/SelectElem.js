import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectField } from 'react-md';
import withContext from '../../../context/Context_HOC';
//import { SelectField, Label, Hint, Select, Item } from '@zendeskgarden/react-select';

/* const DATA = {
   'item-1': 'Item 1',
   'item-2': 'Item 2',
   'item-3': 'Item 3'
}; */
/* 
const returnValue = (args, secondColumn, i) => {
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
}; */

class SelectElem extends Component {
   /*    state = {
      selectedKey: 'item-1'
   }; */
   render() {
      const {
         i,
         handleArgTypeChange,
         args,
         argsName,
         secondColumn,
         values,
         title,
         context
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
         /*  <SelectField>
            <Label>Label</Label>
            <Hint>Hint</Hint>
            <Select
               selectedKey={this.state.selectedKey}
               onChange={selectedKey => this.setState({ selectedKey })}
               options={[
                  <Item key="item-1">Item 1</Item>,
                  <Item key="item-2">Item 2</Item>,
                  <Item key="item-3">Item 3</Item>
               ]}
            >
               {this.state.selectedKey} is currently selected
            </Select>
         </SelectField> */
         <SelectField
            id={`select-field${Math.random()}`}
            label={title}
            className="md-cell md-cell--bottom select-elem"
            menuItems={values.map((elem, i) => `${elem}`)}
            simplifiedMenu={false}
            value={conditionalValue}
            onChange={handleArgTypeChange(i)(secondColumn === true ? 1 : 0)(argsName)}
            style={{ width: context.isMobile ? '45%' : '40%' }}
            listStyle={{ fontSize: context.isMobile ? '14px' : '16px' }}
         />
      );
   }
}

SelectElem.propTypes = {
   i: PropTypes.number.isRequired,
   handleArgTypeChange: PropTypes.func.isRequired,
   args: PropTypes.array.isRequired,
   argsName: PropTypes.string.isRequired,
   secondColumn: PropTypes.bool.isRequired,
   values: PropTypes.array.isRequired,
   title: PropTypes.string.isRequired
};

export default withContext(SelectElem);
