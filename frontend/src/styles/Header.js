import styled from 'styled-components';
import { device } from './breakpoints';

export const HeaderWrapper = styled.div`
   display: grid;
   @media ${device.mobile} {
      grid-template-columns: 100%;
   }
   @media ${device.desktop} {
      grid-template-columns: 30% 70%;
   }
`;

export const FormWrapper = styled.form`
   display: flex;
   @media ${device.mobile} {
      flex-direction: column;
      justify-self: center;
      height: auto;
   }
   @media ${device.desktop} {
      flex-direction: row;
      justify-self: end;
      height: 100px;
   }
   align-items: center;
`;

export const MyAppBar = styled.header`
   width: 100%;
   background: #fff;
   border-bottom: 1px solid #e0e4e7;
   box-sizing: border-box;
   padding: 0 50px;
`;

export const Links = styled.div`
   display: flex;
   @media ${device.mobile} {
      flex-direction: column;
      text-align: center;
      margin: 30px 0;
   }
   @media ${device.desktop} {
      align-items: center;
   }
   font-size: 1.25rem;
   font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
   font-weight: 700;
   text-transform: uppercase;
   .links {
      text-decoration: none;
   }
   .links__tasks {
      color: ${props => props.theme.primaryColor};
   }

   .links__runcode {
      color: ${props => props.theme.color};
      @media ${device.desktop} {
         margin-right: 30px;
      }
      @media ${device.mobile} {
         margin-bottom: 5px;
      }
   }

   @media ${device.desktop} {
      a:first-child {
         :after {
            content: '|';
            margin-left: 30px;
            position: relative;
            top: -1px;
         }
      }
   }
`;
