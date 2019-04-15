import styled from 'styled-components';
import { addAlphaChannel } from '../utils/utils';
import { device } from './breakpoints';

export const Wrapper = styled.main`
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${props => props.theme.backgroundColor};
`;

export const MyPaper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   background: #fff;
   @media ${device.mobile} {
      border-top: 1px solid #e0e4e7;
      margin: 20px auto 0 auto;
      padding: 10px 10px 20px 10px;
   }
   @media ${device.desktop} {
      border: 1px solid #e0e4e7;
      border-radius: 4px;
      margin: 20px 10px;
      padding: 45px 60px;
      width: 550px;
   }
`;

export const Form = styled.form`
   width: 100%;
`;

export const EditorWrapper = styled.div`
   margin-top: 8px;
   width: 100%;
   height: 600px;
`;

//TODO - wywalic to do wlasnego komponentu
export const ButtonWrapper = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   @media ${device.desktop} {
      margin: 0 -10px 0 auto;
   }
   .lds-ring {
      display: inline-block;
      position: relative;
      width: 24px;
      height: 24px;
   }
   .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 22px;
      height: 22px;
      margin: 2px;
      border: 2px solid #fff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
   }
   .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
   }
   .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
   }
   .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
   }
   @keyframes lds-ring {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
`;

export const SliderWrapper = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   width: 100%;

   .mySlider {
      /*  transition: all 2s; */
      :hover {
         .rc-slider-handle {
            box-shadow: 0px 0px 6px -1px ${props => props.theme.primaryColor};
         }
         .rc-slider-rail {
            background-color: ${props => props.theme.disabled};
         }
      }
      :active {
         .rc-slider-handle {
            box-shadow: 0px 0px 6px -1px ${props => props.theme.primaryColor};
         }
      }
   }
`;

export const SelectWrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   column-gap: 15px;
   margin-bottom: ${props => !props.last && '15px'};
`;

export const RowWrapper = styled.div`
   display: flex;
   flex-direction: ${props => (props.column ? 'column' : 'row')};
   flex-wrap: wrap;
   margin: ${props => props.theme.defaultSpacing};
   position: relative;
   width: 100%;
   margin-left: ${props => (props.leftMargin ? props.theme.defaultSpacing : '0px')};
`;

export const GridWrapper = styled.div`
   display: grid;
   @media ${device.mobile} {
      grid-template-columns: repeat(auto-fill, 70px);
   }
   @media ${device.desktop} {
      grid-template-columns: ${props => props.grid};
   }
   grid-auto-rows: auto;
   grid-column-gap: 20px;
   margin-top: 10px;
`;

export const Span = styled.span`
   color: ${props => addAlphaChannel(props.theme.secondaryColor, '0.95')};
   font-weight: 600;
`;
