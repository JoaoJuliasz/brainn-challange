import React from 'react'
// @ts-ignore
import { shallow } from 'enzyme'
import SelectType from './SelectType'

describe('SelectType', () => {
    const mockContest = {
        id: '456',
        loteria: 6,
        numeros: ['1', '4', '5'],
        data: ''
    }

    const mockLotteries = [{
        value: 1,
        label: 'mega-sena'
    },
    {
        value: 2,
        label: 'quina'
    }
    ]

    const mockSelectedLottery = '1'

    const mockLoterriesContests = [{
        loteriaId: 6,
        concursoId: '456'
    }]

    const mockSetSelectedLottery = jest.fn();
    const mockSetLoading = jest.fn();
    const mockSetContest = jest.fn();

    const wrapper = shallow(<SelectType contest={mockContest} lotteries={mockLotteries} selectedLottery={mockSelectedLottery} lotteriesContests={mockLoterriesContests} setSelectedLottery={mockSetSelectedLottery} setLoading={mockSetLoading} setContest={mockSetContest} />)
    it('expect to render SelectType component', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should change lottery value', () => {
        wrapper.find('[id="lottery-selector"]').simulate('change', { target: { value: { value: 2, label: 'quina' } } })
        expect(wrapper.find('[id="lottery-selector"]').props().value).toStrictEqual({ value: 2, label: 'quina' })
        expect(mockSetSelectedLottery).toHaveBeenCalled()
    })
})