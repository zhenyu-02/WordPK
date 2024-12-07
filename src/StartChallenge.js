import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function StartChallenge({ uploadedWords }) {
    const [selectedWords, setSelectedWords] = useState(uploadedWords[0]?.words || []);

    console.log(selectedWords,'renderStart')
    const handleSelectChange = (event) => {
        const selected = uploadedWords.find(group => group.english === event.target.value);
        setSelectedWords(selected ? selected.words : []);
        console.log('event', selected, selectedWords)
    };

    return (
        <div className="start-challenge-container">
            <h1 className="start-challenge-title">选择挑战模式</h1>
            {/* TODO 自定义超时时间 */}
            <div className="select-container">
                <label htmlFor="word-select" className="select-label">选择单词表:</label>
                <select id="word-select" onChange={handleSelectChange} className="word-select">
                    {uploadedWords.map((group, index) => (
                        <option key={index} value={group.english}>{group.english}</option>
                    ))}
                </select>
            </div>
            <Link className="start-challenge-link" to="/single" state={{ words: selectedWords }}>单人挑战</Link>
            <Link className="start-challenge-link" to="/double" state={{ words: selectedWords }}>双人 PK</Link>
            <Link to="/" className="back-button">返回首页</Link>
        </div>
    );
}

export default StartChallenge; 