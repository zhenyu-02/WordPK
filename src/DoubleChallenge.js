import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import QuizGame from './QuizGame';

function DoubleChallenge() {
    const location = useLocation();
    const { words } = location.state || { words: [] }; // 获取传入的 words，默认为空数组

    return (
        <div className="full-height-container double-challenge-container">
            <div className="double-challenge-layout">
                <div className="quiz-game-container">
                    <QuizGame playerName="玩家 1" words={words} />
                </div>
                <div className="quiz-game-container">
                    <QuizGame playerName="玩家 2" words={words} />
                </div>
            </div>
            <Link to="/" className="back-button">返回首页</Link>
        </div>
    );
}

export default DoubleChallenge; 