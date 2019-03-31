import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './components/layout/Header';
//import Footer from "./components/layout/Footer";
import Landing from './components/layout/Landing';

const theme = {
   primaryColor: '#009688',
   primaryColorDarker: '#00786c',
   secondaryColor: '#3F51B5',
   errorColor: '#F44336',
   defaultSpacing: '8px',
   defaultFontSize: '16px',
   color: 'rgba(0, 0, 0, 0.87)',
   lighterColor: 'rgba(0, 0, 0, 0.7)',
   placeholderColor: 'rgba(0, 0, 0, 0.4)',
   inputBorderColor: 'rgba(0, 0, 0, 0.3)',
   inputBorderColorHover: 'rgba(0, 0, 0, 0.6)',
   disabledStronger: 'rgba(0, 0, 0, 0.26)',
   disabled: 'rgba(0, 0, 0, 0.12)'
};

const GlobalStyle = createGlobalStyle`
   html, body {
      width: 100%;
      font-family: Roboto;
      font-size: ${theme.defaultFontSize};
      margin: 0;
      padding: 0;
      
   }
   ::selection {
      background: ${theme.primaryColor};
      color: white;
   }
   h3{
      font-weight: 500;
      margin: 5px 0;
   }
   p{
      font-size: 14px;
      font-weight: 400;
      margin: 0;
      color: ${theme.lighterColor};
   }
   textarea, input, button, select { font-family: inherit; font-size: inherit; }
`;

class App extends Component {
   render() {
      return (
         <Router>
            <ThemeProvider theme={theme}>
               <React.Fragment>
                  <GlobalStyle />
                  {/*  <Header /> */}
                  <Route exact path="/" component={Landing} />
                  {/*<Footer />*/}
               </React.Fragment>
            </ThemeProvider>
         </Router>
      );
   }
}

export default App;
