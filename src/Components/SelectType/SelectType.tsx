import React, { useEffect } from 'react';
// @ts-ignore
import instance from '../../config/config'
// @ts-ignore
import logo from '../../assets/Logo_Sena.png'
import Select, { StylesConfig } from 'react-select'
// @ts-ignore
import { ValueType } from "react-select/lib/types";
import './SelectType.style.scss'
import { Lotteries, Contest, LotteriesContests } from '../dataTypes/types'

type SelectLotteryProps = {
    lotteries: Lotteries[],
    selectedLottery: string,
    setSelectedLottery: (value: string) => void,
    lotteriesContests: LotteriesContests,
    contest: Contest,
    setContest: (value: Contest) => void,
    setLoading: (value: boolean) => void
}

const SelectType = ({ lotteries, selectedLottery, setSelectedLottery, lotteriesContests, contest, setContest, setLoading }: SelectLotteryProps) => {

    const selectStyles: StylesConfig = {
        container: () => ({ width: 200, margin: '20px' }),
        menu: () => ({ top: 'auto', background: '#fff', position: 'absolute', width: 200, borderRadius: '10px', margin: '5px 0', zIndex: 3 }),
        indicatorSeparator: () => ({ display: 'none' }),
        control: () => ({
            border: 'none', borderRadius: '10px', boxShadow: '5px 5px 31px -10px #000000',
            display: 'flex', flexWrap: 'wrap', background: '#fff', justifyContent: 'space-around', minHeight: '38px', transition: 'all 100ms'
        })
    }


    const getContest = (id: number) => {
        setLoading(true)
        const contestId = lotteriesContests?.find(contest => contest.loteriaId === id)
        instance.get<Contest[]>(`concursos/${contestId?.concursoId}`)
            .then((res: any) => {
                setContest(res.data)
                setLoading(false)
            })
    }

    const formatDate = (item: string) => {
        let date = new Date(item),
            day = date.getDate().toString(),
            dayF = (day.length === 1) ? '0' + day : day,
            month = (date.getMonth() + 1).toString(),
            monthF = (month.length === 1) ? '0' + month : month,
            yearF = date.getFullYear()
        return dayF + "/" + monthF + "/" + yearF;
    }

    const selectLotteryChange = (option: ValueType<Lotteries>) => {
        setSelectedLottery(option.value)
        getContest(option.value)
    }

    useEffect(() => {
        getContest(0)
    }, [lotteriesContests])

    return (
        <div className="lottery-background">
            <div className={`lottery-background-${selectedLottery}`}>
                <div className="select-container">
                    <Select
                        onChange={selectLotteryChange}
                        value={lotteries[parseInt(selectedLottery)]}
                        options={lotteries}
                        styles={selectStyles}
                    />
                </div>
                {contest &&
                    <div className="contest-info-container">
                        <div className="lottery-info">
                            <img src={logo} alt="logo-loteria" />
                            <p>{lotteries[contest.loteria]?.label}</p>
                        </div>

                        <div className="contest-info">
                            <p>Concurso</p>
                            <p>{contest.id} - {contest.data ? formatDate(contest.data) : ''}</p>
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default SelectType;