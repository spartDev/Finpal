import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import { Link } from 'react-router';

import NotFoundPage from '../';

// Use Chai Enzyme
chai.use(chaiEnzyme());

describe('<NotFoundPage />', () => {
  it('should render appropriately', () => {
    const wrapper = shallow(<NotFoundPage />);

    expect(wrapper).to.have.length(1);
    expect(wrapper.find('h1')).to.have.text('404 error');
    expect(wrapper.find('p')).to.have.text('Oops, Page was not found!');
    expect(wrapper.find(Link)).to.be.present();
  });
});
