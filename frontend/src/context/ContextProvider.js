import React, { Component } from 'react';

// first we will make a new context
export const AppContext = React.createContext();

// Then create a provider Component
export class ContextProvider extends Component {
   constructor() {
      super();
      this.state = {
         isMobile: false,
         taskTests: []
         /*imieINazwisko: "",
            nazwaFunkcji: "",
            tytulZadania: "",
            opisZadania: "",
            iloscArg: 1, //ile parametrów ma funkcja
            iloscWynikow: 1, //ile zestawów wartości do przeprowadzenia testu wysłał uzytkownik
            args: [...Array(2)], //typy parametrów funkcji np. string
            returnArgs: [...Array(2)], //typ zwracany przez funkcje np. string
            wyniki: [...Array(2)], //wartości, które posłużą do przeprowadzenia testu np. a = 2, b = 3 i wartość zwracana 6
            czyRekurencja: false, //czy w funkcji zachodzi rekurencja
            code: ""*/
      };
   }

   /*handleTextInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onEditorChange = (newValue, e) => {
        this.setState({ code: newValue });
    };*/

   addTask = taskTests => {
      this.setState({ taskTests });
   };

   componentDidMount() {
      if (window.innerWidth < 900) {
         this.setState({ isMobile: true });
      }
      this.updateWindowDimensions(true)();
      window.addEventListener('resize', this.updateWindowDimensions(false));
   }

   componentDidUpdate() {
      console.log('update z contextu');
   }

   shouldComponentUpdate(nextProps, nextState) {
      if (
         nextState.isMobile === this.state.isMobile &&
         nextState.taskTests[0] === this.state.taskTests[0]
      ) {
         return false;
      }
      return true;
   }

   updateWindowDimensions = first => deets => {
      if (!first) {
         if (
            /iPhone|Android/i.test(navigator.userAgent) ||
            deets.currentTarget.innerWidth < 900
         ) {
            this.setState({ isMobile: true });
         } else {
            this.setState({ isMobile: false });
         }
      } else {
         if (/iPhone|Android/i.test(navigator.userAgent)) {
            this.setState({ isMobile: true });
         }
      }
   };

   componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
   }

   render() {
      return (
         <AppContext.Provider
            value={{
               ...this.state,
               addTask: this.addTask
               //handleTextInputChange: this.handleTextInputChange,
            }}
         >
            {this.props.children}
         </AppContext.Provider>
      );
   }
}
