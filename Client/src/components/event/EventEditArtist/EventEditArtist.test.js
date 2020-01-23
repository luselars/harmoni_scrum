import React from 'react';
import EventEditArtist from './EventEditArtist.js';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
it('shallow renders without crashing', () => {
  shallow(<EventEditArtist match={{ params: { id: 0 } }} />);
});
