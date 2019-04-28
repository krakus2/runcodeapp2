import styled from 'styled-components';
import { addAlphaChannel } from '../utils/utils';
import { device } from './breakpoints';

export const Wrapper = styled.main`
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${props => props.theme.backgroundColor};
   height: 100%;
   @media ${device.mobile} {
      /* padding-bottom: 25px; */
   }
   @media ${device.desktop} {
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

export const SimpleWrapper = styled.div`
   text-align: center;
   h3 {
      padding: 0;
      margin: 20px 0 0 0;
   }
`;

export const ChartWrapper = styled.div`
   text-align: center;
   margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '50px')};
   h3 {
      padding: 0;
      margin: 20px 0 0 0;
   }
   @media ${device.desktop} {
      width: ${props =>
         (props.width && props.width !== 'auto' && `${props.width}px`) ||
         (props.width === 'auto' && 'auto') ||
         '500px'};
      height: ${props =>
         (props.height && props.height !== 'auto' && `${props.height}px`) ||
         (props.height === 'auto' && 'auto') ||
         '500px'};
   }
   @media ${device.mobile} {
      width: ${props =>
         (props.mobileWidth &&
            props.mobileWidth !== 'auto' &&
            `${props.mobileWidth}px`) ||
         (props.mobileWidth === 'auto' && 'auto') ||
         '90%'};
      margin-left: 20px;
      margin-right: 20px;
      height: ${props =>
         (props.mobileHeight && props.isMobile && `${props.mobileHeight}px`) ||
         (props.mobileHeight === 'auto' && props.isMobile && 'auto') ||
         '300px'};
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
   @media ${device.desktop} {
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
   @media ${device.mobile} {
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
export const SwitchWrapper = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   margin-bottom: 30px;
   width: 90%;
   @media ${device.mobile} {
      span {
         width: 225px;
      }
   }
`;

export const TableStyles = styled.div`
   @media (min-width: 1180px) {
      width: 50vw;
      margin-left: auto;
      margin-right: auto;
      padding-left: 10px;
      padding-right: 10px;
   }
   h3 {
      text-align: center;
      padding: 0 0 10px 0;
   }

   .responsive-table {
      li {
         border-radius: 3px;
         padding: 25px 30px;
         display: flex;
         justify-content: space-between;
         margin-bottom: 25px;
      }
      .table-header {
         background-color: ${props => addAlphaChannel(props.theme.primaryColor, '0.5')};
         font-size: 14px;
         text-transform: uppercase;
         letter-spacing: 0.03em;
      }
      .table-row {
         background-color: #ffffff;
         box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
      }

      .col {
         text-align: center;
      }

      .col-1 {
         flex-basis: 15%;
      }
      .col-2 {
         flex-basis: 30%;
      }
      .col-3 {
         flex-basis: 55%;
      }

      @media (max-width: 1180px) {
         width: 90%;
         margin-left: auto;
         margin-right: auto;
         ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
         }
         .table-header {
            display: none;
         }
         .table-row {
         }
         li {
            display: block;
         }
         .col {
            display: grid;
            grid-template-columns: 1fr 1fr;
         }
         .col {
            /* display: flex; */
            padding: 10px 0;
            text-align: left;
            span {
               display: block;
            }
            &:before {
               justify-self: start;
               color: #6c7a89;
               padding-right: 10px;
               content: attr(data-label);
               text-align: right;
            }
         }
      }
   }
`;
