import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SingleChallenge from './SingleChallenge';
import DoubleChallenge from './DoubleChallenge';
import Admin from './Admin';
import StartChallenge from './StartChallenge';

const initialWords = [
    {
        "english": "Fruits",
        "words": [
            { "english": "Apple", "chinese": ["苹果", "果子", "苹果树"] },
            { "english": "Banana", "chinese": ["香蕉", "黄果", "香蕉树"] },
        ]
    },
    {
        "english": "Vegetables",
        "words": [
            { "english": "Carrot", "chinese": ["胡萝卜", "红萝卜"] },
            { "english": "Potato", "chinese": ["土豆", "马铃薯"] },
            { "english": "Tomato", "chinese": ["西红柿", "番茄"] },
            { "english": "Cucumber", "chinese": ["黄瓜", "青瓜"] },
            { "english": "Spinach", "chinese": ["菠菜", "绿叶菜"] }
        ]
    }
    // 可以添加更多的单词表
];

function App() {
    const [words, setWords] = useState(initialWords); // 管理单词表

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/start" element={<StartChallenge uploadedWords={words} />} />
                    <Route path="/single" element={<SingleChallenge  />} />
                    <Route path="/double" element={<DoubleChallenge />} />
                    <Route path="/admin" element={<Admin setWords={setWords} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;