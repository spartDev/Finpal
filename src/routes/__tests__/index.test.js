import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Router, browserHistory } from 'react-router';

import routes from '../index.js';

describe('routes', () => {
  it('should render in a <Router>', () => {
    const wrapper = shallow(
      <div>
        <Router routes={routes()} history={browserHistory} />
      </div>
    );
    expect(wrapper).to.have.length(1);
  });
});
