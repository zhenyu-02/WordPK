import React from 'react';
import { Link } from 'react-router-dom';
import QuizGame from './QuizGame';
import { useLocation } from 'react-router-dom';

function SingleChallenge() {
    const location = useLocation();
    const { words } = location.state || { words: [] }; // 获取传入的 words，默认为空数组

    console.log(words, 'receivedWords'); // 检查接收到的 words

    return (
        <div className="full-height-container single-challenge-container">
            <div className="quiz-game-container">
                <QuizGame playerName="玩家 1" words={words} />
            </div>
            <Link to="/" className="back-button">返回首页</Link>
        </div>
    );
}

export default SingleChallenge; 