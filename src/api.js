// src/api.js
const API_URL = 'http://localhost:3000/words';

export const fetchWords = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        return await response.json();
    } catch (error) {
        console.error('获取单词表失败:', error);
        throw error; // 重新抛出错误以便在调用处处理
    }
};

export const updateWordList = async (wordList) => {
    try {
        const response = await fetch(`${API_URL}/updateWordList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wordList),
        });
        if (!response.ok) {
            throw new Error('更新单词表失败');
        }
        return await response.json();
    } catch (error) {
        console.error('更新单词表失败:', error);
        throw error;
    }
};

export const deleteWordList = async (english) => {
    try {
        const response = await fetch(`${API_URL}/deleteWordList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ english }),
        });
        if (!response.ok) {
            throw new Error('删除单词表失败');
        }
        return await response.json();
    } catch (error) {
        console.error('删除单词表失败:', error);
        throw error;
    }
};