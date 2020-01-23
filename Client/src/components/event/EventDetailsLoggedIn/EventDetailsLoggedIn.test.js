import React from 'react';
import EventDetailsLoggedIn from './EventDetailsLoggedIn';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
it('shallow renders without crashing', () => {
  const wrapper = shallow(<EventDetailsLoggedIn match={{ params: { id: 0 } }} />);
});
