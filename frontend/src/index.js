import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './context/ContextProvider.js';
import * as serviceWorker from './serviceWorker';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
   google: {
      families: ['Roboto:300,400,500,700', 'Material Icons']
   }
});

ReactDOM.render(
   <React.StrictMode>
      <ContextProvider>
         <App />
      </ContextProvider>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
