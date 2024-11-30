import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer'; // 引入新的倒计时组件
import './App.css'; // 引入 CSS 文件



function Quiz({ onQuizComplete, words }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedChinese, setSelectedChinese] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    const handleSelect = (chinese) => {
        if (!isSubmitted) {
            setSelectedChinese(chinese);
        }
    };

    const handleSubmit = () => {
        if (isSubmitted) return;
        setIsSubmitted(true);
        if (selectedChinese === words[currentWordIndex].chinese[0]) {
            setScore(score + 1);
        } else {
            setIncorrectAnswers([...incorrectAnswers, words[currentWordIndex].english]);
        }
    };

    const handleNext = () => {
        if (currentWordIndex + 1 === words.length) {
            onQuizComplete(score, incorrectAnswers); // 完成测验时传递分数和错题
        } else {
            setIsSubmitted(false);
            setSelectedChinese(null);
            setCurrentWordIndex(currentWordIndex + 1);
        }
    };

    const handleTimeUp = () => {
        handleSubmit(); // 时间到达时自动提交
    };

    return (
        <div className="quiz-container">
            <h1 className="word">{words[currentWordIndex].english}</h1>
            <div className="button-container">
                {words[currentWordIndex].chinese.map((chinese, index) => {
                    const isCorrect = chinese === words[currentWordIndex].chinese[0];
                    const isSelected = selectedChinese === chinese;
                    return (
                        <button
                            key={index}
                            className={`chinese-button 
                                ${isSubmitted && isCorrect ? 'correct' : ''} 
                                ${isSubmitted && isSelected && !isCorrect ? 'incorrect' : ''} 
                                ${!isSubmitted && isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelect(chinese)}
                        >
                            {chinese}
                        </button>
                    );
                })}
            </div>
            <h2 className="score">积分: {score}</h2>
            <div className="result-container">
                {isSubmitted && (
                    <div>
                        {selectedChinese === words[currentWordIndex].chinese[0] ? (
                            <h3 className="result correct">回答正确！</h3>
                        ) : (
                            <h3 className="result incorrect">正确答案是: {words[currentWordIndex].chinese[0]}</h3>
                        )}
                    </div>
                )}
            </div>
            {!isSubmitted && (
                <CountdownTimer duration={10} onTimeUp={handleTimeUp} /> // 使用新的倒计时组件
            )}
            <div className="button-wrapper">
                {isSubmitted ? (
                    <button className="next-button" onClick={handleNext}>
                        {currentWordIndex + 1 === words.length ? '查看结果' : '下一个'}
                    </button>
                ) : (
                    <button className="submit-button" onClick={handleSubmit}>提交</button>
                )}
            </div>
        </div>
    );
}

export default Quiz;