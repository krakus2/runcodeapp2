import React, { Component } from 'react';

// first we will make a new context
export const AppContext = React.createContext();

// Then create a provider Component
export class ContextProvider extends Component {
   constructor() {
      super();
      this.state = {
         isMobile: false,
         task_tests: []
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

   addTask = task_tests => {
      console.log('dodawanie task_tests', task_tests);
      this.setState({ task_tests: 'no elo' });
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
      if (nextState.isMobile === this.state.isMobile) {
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

// This function takes a component...
/*export function withContext(Component) {
    // ...and returns another component...
    return function ContextComponent(props) {
        // ... and renders the wrapped component with the context theme!
        // Notice that we pass through any additional props as well
        return (
            <MyContext.Consumer>
                {context => <Component {...props} context={context} />}
            </MyContext.Consumer>
        );
    };
}*/
