import React, { useState, useEffect } from 'react';
import './App.css'; // 引入 CSS 文件
import CountdownTimer from './CountdownTimer'; // 引入新的倒计时组件

// 单词和对应的中文选项
const words = [
    { english: 'Apple', chinese: ['苹果', '香蕉', '橙子', '葡萄'] },
    { english: 'Banana', chinese: ['香蕉', '苹果', '橙子', '草莓'] },
    { english: 'Orange', chinese: ['橙子', '苹果', '香蕉', '西瓜'] },
    { english: 'Grape', chinese: ['葡萄', '苹果', '橙子', '草莓'] },
    { english: 'Strawberry', chinese: ['草莓', '香蕉', '苹果', '橙子'] },
    { english: 'Peach', chinese: ['桃子', '苹果', '香蕉', '橙子'] },
    { english: 'Watermelon', chinese: ['西瓜', '苹果', '香蕉', '橙子'] },
    { english: 'Pineapple', chinese: ['菠萝', '苹果', '香蕉', '橙子'] },
    // 可以添加更多单词
];

function App() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedChinese, setSelectedChinese] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10); // 10秒倒计时
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            setTimer(timerId);
        } else if (timeLeft === 0) {
            handleSubmit(); // 超时自动提交
        }
        return () => clearInterval(timer);
    }, [timeLeft, isSubmitted]);

    const handleSelect = (chinese) => {
        if (!isSubmitted) { // 只有在未提交时才允许选择
            setSelectedChinese(chinese);
        }
    };

    const handleSubmit = () => {
        if (isSubmitted) return; // 如果已经提交，直接返回
        setIsSubmitted(true);
        clearInterval(timer); // 提交时清除定时器
        if (selectedChinese === words[currentWordIndex].chinese[0]) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        setIsSubmitted(false);
        setSelectedChinese(null);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
        setTimeLeft(10); // 重置计时器
    };

    return (
        <div className="app-container">
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
            {!isSubmitted && ( // 仅在未提交时显示倒计时
                <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
            )}
            <div className="button-wrapper">
                {isSubmitted ? (
                    <button className="next-button" onClick={handleNext}>下一个</button>
                ) : (
                    <button className="submit-button" onClick={handleSubmit}>提交</button>
                )}
            </div>
        </div>
    );
}

export default App;