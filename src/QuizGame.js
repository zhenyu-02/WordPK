import React, { useState } from 'react';
import Quiz from './Quiz'; // 引入 Quiz 组件
import './App.css'; // 引入 CSS 文件

function QuizGame({ playerName, words }) {
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const totalQuestions = words.length; // 假设总题数为 words 的长度

    const handleQuizCompletion = (score, incorrect) => {
        setFinalScore(score);
        setIncorrectAnswers(incorrect);
        setIsQuizCompleted(true);
    };

    return (
        <div className="result-summary-container">
            <h1>{playerName} 的答题结果</h1>
            {!isQuizCompleted ? (
                <Quiz onQuizComplete={handleQuizCompletion} words={words} />
            ) : (
                <div className="result-layout">
                    <div className="result-summary">
                        <h3>总分: {finalScore}</h3>
                        <h3>总题数: {totalQuestions}</h3>
                        <h3>正确题数: {totalQuestions - incorrectAnswers.length}</h3>
                        <h3>错误题数: {incorrectAnswers.length}</h3>
                    </div>
                    <div className="incorrect-answers-container">
                        <h3>错题:</h3>
                        <ul className="incorrect-answers">
                            {incorrectAnswers.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizGame; 