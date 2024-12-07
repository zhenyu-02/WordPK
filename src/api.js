// src/api.js
const API_URL = 'http://localhost:3000';

export const fetchWords = async () => {
    try {
        const response = await fetch(`${API_URL}/words`);
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        return await response.json();
    } catch (error) {
        console.error('获取单词表失败:', error);
        throw error; // 重新抛出错误以便在调用处处理
    }
};