import Tooltip from '../components/utils/Tooltip';
/* const AppContext = React.createContext();

jest.mock('../context/Context_HOC'),
   () => ({
      context: () => {
         isMobile: false;
      }
   }); */
it('renders correctly', () => {
   const wrapper = render(<Tooltip title="Tooltip" />);
   expect(wrapper).toMatchSnapshot();
});
