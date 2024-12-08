import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  mockRecords } from './mocks'; // 导入 mock 数据
import WordListEditor from './WordListEditor'; // 导入新组件
import { updateWordList, deleteWordList, fetchWords } from './api'; // 导入 API 函数
import { parseInput } from './utils';

function Admin({ setWords }) {
    const [file, setFile] = useState(null);
    const [records, setRecords] = useState([]);
    const [uploadedWords, setUploadedWords] = useState([]);
    const [currentWordLists, setCurrentWordLists] = useState([]); // 新增状态用于存储当前单词表

    useEffect(() => {
        async function fetchData() {
            // 模拟获取单词表和历史记录
            const wordLists = await fetchWords();
            setCurrentWordLists(wordLists);
            setRecords(mockRecords);
        }
        fetchData(); // 调用异步函数
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const fetchWordLists = async () => {
        // 这里添加获取最新单词表的逻辑
        try {
            const updatedWordLists = await fetchWords(); // 假设这是获取单词表的 API
            setCurrentWordLists(updatedWordLists);
        } catch (error) {
            console.error('获取单词表时出错:', error);
        }
    };

    const handleUpload = () => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const content = e.target.result;
            console.log(content); // 直接输出文件内容
            const newWordList = parseInput(content);
            console.log(newWordList); // 输出解析后的单词表
            try {
                await updateWordList(newWordList); // 调用更新 API
                await fetchWordLists(); // 上传后重新获取单词表
            } catch (error) {
                console.error('上传单词表时出错:', error);
            }
        };
        reader.readAsText(file);
    };

    const handleDeleteWordList = async (index) => {
        if (window.confirm('确认删除该单词表吗？')) { // 添加确认弹窗
            const wordListToDelete = currentWordLists[index];
            try {
                await deleteWordList(wordListToDelete.english); // 调用删除 API
                await fetchWordLists(); // 删除后重新获取单词表
            } catch (error) {
                console.error('删除单词表时出错:', error);
            }
        }
    };


    const handleSaveWordList = async (updatedWordList) => {
        try {
            await updateWordList(updatedWordList); // 调用更新 API
            await fetchWordLists(); // 保存后重新获取单词表
        } catch (error) {
            console.error('保存单词表时出错:', error);
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">管理页面</h1>
            <div className="upload-section">
                <h2>上传单词表</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>上传</button>
            </div>

            <div className="manage-words-section">
                <h2>管理当前单词表</h2>
                <ul>
                    {currentWordLists.map((wordList, index) => (
                        <li key={index}>
                            <WordListEditor wordList={wordList} onSave={handleSaveWordList} />
                            <button className='delete-list-button' onClick={() => handleDeleteWordList(index)}>删除单词表</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Link to="/?refresh=true" className="back-button-admin">返回首页</Link>
        </div>
    );
}

export default Admin; 