import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

function Home() {
    const location = useLocation();

    useEffect(() => {
        if (location.search.includes('refresh=true')) {
          // 创建一个新的 URLSearchParams 对象
          const searchParams = new URLSearchParams(location.search);
          searchParams.delete('refresh');
          const newSearch = searchParams.toString();
          window.location.href = `${location.pathname}${newSearch? '?' + newSearch : ''}`;
        }
      }, [location]);
    return (
        <div className="home-container">
            <h1 className="home-title">欢迎来到单词挑战游戏</h1>
                <Link to="/start" className="home-link">开始挑战</Link>
                <Link to="/admin" className="back-button">进入管理端</Link>
        </div>
    );
}

export default Home; 