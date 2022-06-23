import React from 'react'
// @ts-ignore
import { shallow } from 'enzyme'
import LotteryResults from './LotteryResults'

describe('LotteryResults',() => {
    it('expect to render LotteryResults component', () => {
        const mockContest = {
            id: '6',
            loteria: 456,
            numeros: ['1', '4', '5'],
            data: '2021-04-20T00:28:09.426Z'
        }
        const wrapper = shallow(<LotteryResults contest={mockContest} />)
        expect(wrapper).toMatchSnapshot()
    })
})