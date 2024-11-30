import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">选择挑战模式</h1>
            <Link className="home-link" to="/single">单人挑战</Link>
            <Link className="home-link" to="/double">双人 PK</Link>
        </div>
    );
}

export default Home; 