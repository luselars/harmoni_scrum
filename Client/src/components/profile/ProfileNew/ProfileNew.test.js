import React from 'react';
import ProfileNew from 'ProfileNew';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileNew number={0} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

Enzyme.configure({ adapter: new Adapter() });
it('shallow renders without crashing', () => {
  shallow(<ProfileNew />);
});