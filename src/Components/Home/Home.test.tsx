import React from 'react'
// @ts-ignore
import { shallow } from 'enzyme'
import Home from './Home'

it('should return wrapper length', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper).toMatchSnapshot()
})