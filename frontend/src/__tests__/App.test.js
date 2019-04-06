import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const AppContext = React.createContext();

xit('renders without crashing', () => {
   /* const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div); */
   const wrapper = render(
      <AppContext value={{ isMobile: false }}>
         <App />
      </AppContext>
   );
   expect(wrapper).toMatchSnapshot();
});
