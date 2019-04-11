import styled from 'styled-components';

export const HeaderWrapper = styled.div`
   display: grid;
   @media (max-width: 900px) {
      grid-template-columns: 100%;
   }
   @media (min-width: 901px) {
      grid-template-columns: 30% 70%;
   }
`;

export const FormWrapper = styled.form`
   display: flex;
   @media (max-width: 900px) {
      flex-direction: column;
      justify-self: center;
      height: auto;
   }
   @media (min-width: 901px) {
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

export const Title = styled.div`
   display: flex;
   align-items: center;
   @media (max-width: 900px) {
      text-align: center;
      justify-content: center;
      margin: 30px 0;
   }
   @media (min-width: 901px) {
      align-items: center;
   }
   font-size: 1.25rem;
   font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
   font-weight: 700;
   text-transform: uppercase;
   a {
      color: ${props => props.theme.color};
      text-decoration: none;
   }
`;
