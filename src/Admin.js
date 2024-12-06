import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockWords, mockRecords } from './mocks'; // 导入 mock 数据

function Admin({ setWords }) {
    const [file, setFile] = useState(null);
    const [records, setRecords] = useState([]);
    const [uploadedWords, setUploadedWords] = useState([]);

    useEffect(() => {
        // 模拟获取单词表和历史记录
        setWords(mockWords);
        setRecords(mockRecords);
    }, [setWords]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const words = JSON.parse(content);
            setUploadedWords(words);
            setWords(words);
        };
        reader.readAsText(file);
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">管理页面</h1>
            <div className="upload-section">
                <h2>上传单词表</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>上传</button>
            </div>
            <div className="records-section">
                <h2>历次 PK 记录</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>参与者</th>
                            <th>得分</th>
                            <th>时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index}>
                                <td>{record.player}</td>
                                <td>{record.score}</td>
                                <td>{record.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/" className="back-button">返回首页</Link>
        </div>
    );
}

export default Admin; 