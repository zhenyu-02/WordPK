import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SingleChallenge from './SingleChallenge';
import DoubleChallenge from './DoubleChallenge';
import Admin from './Admin';
import StartChallenge from './StartChallenge';
import { fetchWords } from './api'; // 导入接口请求管理文件

const initialWords = []; // 初始化为空数组

function App() {
    const [words, setWords] = useState(initialWords); // 管理单词表

    useEffect(() => {
        const loadWords = async () => {
            try {
                const data = await fetchWords(); // 调用接口请求管理文件中的函数
                setWords(data); // 设置获取到的单词表
            } catch (error) {
                console.error('加载单词表时出错:', error);
            }
        };

        loadWords(); // 调用加载单词表的函数
    }, []); // 仅在组件挂载时执行

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