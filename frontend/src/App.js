import React, { Component } from 'react';
import './App.scss';
import { ContextProvider } from './context/ContextProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
//import Footer from "./components/layout/Footer";
import Landing from './components/layout/Landing';
import { ThemeProvider } from 'styled-components';

import '@zendeskgarden/react-textfields/dist/styles.css';
import '@zendeskgarden/react-select/dist/styles.css';

const theme = {
   primaryColor: '#009688',
   secondaryColor: '#D500F9',
   errorColor: '#F44336',
   defaultSpacing: '8px'
};

class App extends Component {
   render() {
      return (
         <Router>
            <ThemeProvider theme={theme}>
               <React.Fragment>
                  <Header />
                  <Route exact path="/" component={Landing} />
                  {/*<Footer />*/}
               </React.Fragment>
            </ThemeProvider>
         </Router>
      );
   }
}

export default App;
