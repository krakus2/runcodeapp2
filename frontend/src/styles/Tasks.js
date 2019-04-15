import styled from 'styled-components';
import { addAlphaChannel } from '../utils/utils';

export const Wrapper = styled.main`
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${props => props.theme.backgroundColor};
   @media (max-width: 899px) {
      /* padding-bottom: 25px; */
   }
   @media (min-width: 900px) {
      /* height: calc(100vh - 101px); */
   }
   ul {
      padding: 0;
      list-style-type: none;
      margin: 0;
      padding: 0;
   }
   h3 {
      padding: 30px 0 15px 0;
   }
`;

export const ChartWrapper = styled.div`
   @media (min-width: 900px) {
      width: ${props => (props.width ? `${props.width}px` : '500px')};
      height: ${props => (props.height ? `${props.height}px` : '500px')};
   }
   @media (max-width: 899px) {
      width: 300px;
      height: 300px;
   }
`;

export const Line = styled.li`
   font-size: 20px;
   display: block;
   width: 200px;
   padding: 5px;
   margin: 15px 0;
   text-align: center;
   border-bottom: 1px solid ${props => props.theme.inputBorderColor};
   transition: all 0.15s ease;
   @media (hover) {
      :hover {
         cursor: pointer;
         transform: scale(1.07);
         opacity: 1.1;
         background-color: ${props => addAlphaChannel(props.theme.primaryColor, '0.25')};
      }
   }
`;

export const TopBar = styled.div`
   display: flex;
   @media (min-width: 900px) {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 50px;
      margin-top: 30px;
      h3 {
         margin: 0 20px 0 0;
         padding: 0;
         font-size: 28px;
      }
   }
   @media (max-width: 899px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      h3 {
         margin-bottom: 10px;
         padding: 0;
         font-size: 20px;
      }
   }
`;

export const theme = size => {
   return {
      axis: {
         legend: {
            text: {
               fontSize: size,
               fontFamily: 'Roboto'
            }
         }
      }
   };
};

export function colourStyles() {
   return {
      control: styles => ({ ...styles, cursor: 'pointer' }),
      option: styles => ({ ...styles, cursor: 'pointer' }),
      input: (styles, { isDisabled, isFocused, isSelected }) => ({
         ...styles,
         width: this.props.context.isMobile ? 200 : 300,
         minHeight: this.props.context.isMobile ? '14px' : '25px',
         lineHeight: this.props.context.isMobile ? '14px' : '25px',
         color: this.props.theme.color,
         cursor: 'pointer'
      }),
      placeholder: styles => ({
         ...styles,
         color: this.props.theme.placeholderColor,
         cursor: 'pointer',
         fontSize: this.props.context.isMobile && '15px'
      }),
      singleValue: styles => ({
         ...styles,
         color: this.props.theme.color,
         cursor: 'pointer'
      })
   };
}
