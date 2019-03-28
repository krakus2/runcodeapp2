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
   ${props => !props.isMobile && 'padding-right: 30px'};
   ${props => !props.isMobile && 'padding-top: 13px;'};
   ${props => !props.error && 'padding-bottom: 19px'};
`;

export const MyAppBar = styled.header`
   width: 100%;
   background: #fff;
   border-bottom: 1px solid #e0e4e7;
   padding: 0 30px;
`;

export const Title = styled.div`
   display: block;
   ${props => props.isMobile && 'text-align: center'};
   font-size: 1.25rem;
   font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
   font-weight: 700;
   text-transform: uppercase;
   ${props =>
      props.isMobile ? 'padding: 15px 0 10px 0' : 'padding: 33px 23px 30px 24px;'};
`;
