import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Helmet from 'react-helmet';

import Layout from '../';
import { applicationHeader } from '../../../config';

// Use Chai Enzyme
chai.use(chaiEnzyme());

describe('<Layout />', () => {
  it('should render appropriately', () => {
    const wrapper = shallow(
      <Layout><div className={'children'}>Children</div></Layout>
    );

    expect(wrapper).to.have.length(1);
    expect(wrapper.type()).to.equal('div');
    expect(wrapper).to.have.descendants('main');
    expect(wrapper).to.have.descendants('.children');
    expect(wrapper.find('.children')).to.have.text('Children');
  });
});
