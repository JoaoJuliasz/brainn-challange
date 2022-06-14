import './App.css';
import React, { useEffect, useState } from 'react'
import SelectType from './Components/SelectType/SelectType';
// @ts-ignore
import instance from './config/config'
// @ts-ignore
import LotteryResults from './Components/LotteryResults/LotteryResults';

import { Lotteries, Contest, LotteriesContests } from './Components/dataTypes/types'

type LotteriesT = Lotteries[]

const App = () => {

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
    <div className="App">
      <div style={{ height: '100%', display: 'flex', background: '#e9e9e9' }}>
        <div style={{ width: '35%', height: '100%' }}>
          <SelectType lotteries={lotteries} selectedLottery={selectedLottery} setSelectedLottery={setSelectedLottery}
            lotteriesContests={lotteriesContests} contest={contest} setContest={setContest} setLoading={setLoading} />
        </div>
        <div style={{ width: '65%', height: '100%' }}>
          <LotteryResults contest={contest} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
