import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import Header from '../';
import { Navigation } from '../../';

// Use Chai Enzyme
chai.use(chaiEnzyme());

describe('<Header />', () => {
  it('should render appropriately', () => {
    const wrapper = shallow(
      <Header className="myClass" />
    );

    expect(wrapper).to.have.length(1);
    expect(wrapper.type()).to.equal('header');
    expect(wrapper).to.have.descendants(Link);
    expect(wrapper).to.have.descendants(Navigation);
    expect(wrapper.find('h1')).to.have.text('Finpal');
  });
});
