import Tooltip from '../components/utils/Tooltip';
import Enzyme, { shallow, render, mount } from 'enzyme';

it('renders correctly', () => {
   console.log(global.xd);
   const wrapper = shallow(<Tooltip title="Tooltip" />);
   expect(wrapper).toMatchSnapshot();
});
