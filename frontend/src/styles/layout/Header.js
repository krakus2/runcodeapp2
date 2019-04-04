import styled from 'styled-components';

export const HeaderWrapper = styled.div`
   display: grid;
   ${props =>
      props.isMobile ? 'grid-template-columns:100%' : 'grid-template-columns: 30% 70%'};
`;

export const FormWrapper = styled.form`
   display: flex;
   ${props => (props.isMobile ? 'flex-direction: column' : 'flex-direction: row')};
   ${props => (props.isMobile ? 'justify-self: center;' : 'justify-self: end')};
   align-items: center;
   height: ${props => (props.isMobile ? 'auto' : '100px')};
`;

export const MyAppBar = styled.header`
   width: 100%;
   background: #fff;
   border-bottom: 1px solid #e0e4e7;
   ${props => !props.isMobile && 'box-sizing: border-box'};
   padding: 0 50px;
`;

export const Title = styled.div`
   display: flex;
   ${props => (!props.isMobile ? 'align-items: center' : 'justify-content: center')};
   ${props => props.isMobile && 'text-align: center'};
   ${props => (!props.isMobile ? '0' : 'margin: 30px 0')};
   font-size: 1.25rem;
   font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
   font-weight: 700;
   text-transform: uppercase;
`;
