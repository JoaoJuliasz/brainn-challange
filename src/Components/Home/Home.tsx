import React, { useEffect, useState } from 'react'
// @ts-ignore
import instance from '../../config/config'
// @ts-ignore
import LotteryResults from '../LotteryResults/LotteryResults';
import SelectType from '../SelectType/SelectType';
import { Lotteries, Contest, LotteriesContests } from '../dataTypes/types'

import './Home.styles.scss';

type LotteriesT = Lotteries[]

const Home = () => {

    const [lotteries, setLotteries] = useState<LotteriesT>([] as LotteriesT)
    const [lotteriesContests, setLotteriesContests] = useState<LotteriesContests>([] as LotteriesContests)
    const [selectedLottery, setSelectedLottery] = useState<string>('0')
    const [contest, setContest] = useState<Contest>({} as Contest)
    const [loading, setLoading] = useState<boolean>(false)

    const getLotteriesValues = () => {
        instance.get('loterias')
            .then((res: any) => {
                const auxArr: LotteriesT = []
                res.data.map((lottery: { id: number, nome: string }): void => {
                    auxArr.push({ value: lottery.id, label: lottery?.nome })
                })
                setLotteries(auxArr)
            })
    }

    const getLotteriesContestsValues = () => {
        instance.get('loterias-concursos')
            .then((res: any) => setLotteriesContests(res.data))
    }

    useEffect(() => {
        getLotteriesValues()
        getLotteriesContestsValues()
    }, [])

    return (
        <div className="home-container">
            <div className="select-type-container">
                <SelectType lotteries={lotteries} selectedLottery={selectedLottery} setSelectedLottery={setSelectedLottery}
                    lotteriesContests={lotteriesContests} contest={contest} setContest={setContest} setLoading={setLoading} />
            </div>
            <div className="lottery-results-home-container">
                <LotteryResults contest={contest} loading={loading} />
            </div>
        </div>
    );
};

export default Home;