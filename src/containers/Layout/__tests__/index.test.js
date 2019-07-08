import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConnectedLayout, { Layout } from '../';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = {
  transactions: {
    asyncStatus: 'NO_STATUS',
    isActive: false,
  },
  router: {
    push: () => {},
  },
};

// Use Chai Enzyme
chai.use(chaiEnzyme());

describe('<Layout />', () => {
  it('should render appropriately', () => {
    const wrapper = shallow(
      <Layout transactions={mock.transactions}><div className={'children'}>Children</div></Layout>
    );

    expect(wrapper).to.have.length(1);
    expect(wrapper.type()).to.equal('div');
    expect(wrapper).to.have.descendants('main');
    expect(wrapper).to.have.descendants('.children');
    expect(wrapper.find('.children')).to.have.text('Children');
  });

  it('should render the connected component', () => {
    const localStore = mockStore({ transactions: mock.transactions });
    const wrapper = shallow(
      <ConnectedLayout store={localStore} router={mock.router}>
        <div className={'children'}>Children</div>
      </ConnectedLayout>
    );
    expect(wrapper).to.have.length(1);
  });
});
