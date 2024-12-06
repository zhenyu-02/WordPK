import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">欢迎来到单词挑战游戏</h1>
                <Link to="/start" className="home-link">开始挑战</Link>
                <Link to="/admin" className="back-button">进入管理端</Link>
        </div>
    );
}

export default Home; 