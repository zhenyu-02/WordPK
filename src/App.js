import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // 使用 Routes 替代 Switch
import './App.css';
import QuizGame from './QuizGame';
import Home from './Home'; // 引入新的 Home 组件

function App() {
    const words = [
        { english: 'Apple', chinese: ['苹果', '香蕉', '橙子', '葡萄'] },
        { english: 'Banana', chinese: ['香蕉', '苹果', '橙子', '草莓'] },
        // 可以添加更多单词
    ];

    return (
        <Router>
            <div className="app-container">
                <Routes> {/* 使用 Routes 组件 */}
                    <Route path="/" element={<Home />} /> {/* 首页组件 */}
                    <Route path="/single" element={
                        <div style={{ position: 'relative', height: '100vh', width: '95%' }}> {/* 确保容器宽高撑满 */}
                            <QuizGame playerName="玩家 1" words={words} />
                            <Link to="/" className="back-button" style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>返回首页</Link> {/* 添加返回首页按钮 */}
                        </div>
                    } /> {/* 单人挑战 */}
                    <Route path="/double" element={
                        <div style={{ position: 'relative', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* 确保容器宽高撑满并居中内容 */}
                            <div style={{ display: 'flex', flexDirection: 'row', width: '98%', justifyContent: 'space-around' }}> {/* 确保双人挑战的布局为左右并均匀分配空间 */}
                                <div style={{ margin: '0 0.1rem' }}> {/* 添加左右间距 */}
                                    <QuizGame playerName="玩家 1" words={words} />
                                </div>
                                <div style={{ margin: '0 0.1rem' }}> {/* 添加左右间距 */}
                                    <QuizGame playerName="玩家 2" words={words} />
                                </div>
                            </div>
                            <Link to="/" className="back-button" style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>返回首页</Link> {/* 添加返回首页按钮 */}
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;