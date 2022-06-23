import React from 'react';
import { Contest } from '../dataTypes/types';
// @ts-ignore
import './LotteryResults.style.scss'

type LotteryResultsType = {
    contest: Contest
}

const LotteryResults = ({ contest }: LotteryResultsType) => {
    return (
        <div className="lottery-results-container">
            <div className={`lottery-results-numbers ${contest.numeros?.length <= 6 && 'justify-content'}`}>
                {contest && contest.numeros?.map(number =>
                    <div key={number} className="numbers-container">
                        <div className="number">{number}</div>
                    </div>)}
            </div>
        </div>
    );
};

export default LotteryResults;