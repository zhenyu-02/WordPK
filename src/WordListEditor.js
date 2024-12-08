// word-test/src/WordListEditor.js
import React, { useState, useEffect } from 'react';

const WordListEditor = ({ wordList, onSave }) => {
    const [curWordList, setCurWordList] = useState(wordList);
    const [editingWord, setEditingWord] = useState(null);
    const [editForm, setEditForm] = useState({ english: '', chinese: [''] });
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        setCurWordList(wordList);
    }, [wordList]);

    const handleEditWord = (word) => {
        setEditingWord(word);
        setEditForm({ english: word.english, chinese: [...word.chinese] });
        setIsEdited(true)
    };

    const handleConfirmEdit = () => {
        const filteredChinese = editForm.chinese.filter(chinese => chinese.trim() !== '');
        const updatedWordList = {
            ...curWordList,
            words: curWordList.words.map(w => (w.english === editingWord.english ? { english: editForm.english, chinese: filteredChinese } : w))
        };
        setCurWordList(updatedWordList)
        setEditingWord(null);
    };

    const handleCancelEdit = () => {
        setEditingWord(null);
    };

    const handleConfirmEditList = () => {
        onSave(curWordList);
        setIsEdited(false)
    };

    const handleCancelEditList = () => {
        setCurWordList(wordList);
        setIsExpanded(false);
        setIsEdited(false);
    };

    const handleDeleteWord = (word) => {
        if (window.confirm('确定要删除这个单词吗？')) {
            const updatedWordList = {
                ...curWordList,
                words: curWordList.words.filter(w => w.english !== word.english)
            };
            setCurWordList(updatedWordList);
            setIsEdited(true);
        }
    };

    return (
        <div style={{width:'80%'}}>
            <h3>{curWordList.english}</h3>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '隐藏子条目' : '展开子条目'}
            </button>
            {isExpanded && (
                <ul>
                    {curWordList.words.map((word, index) => (
                        <li style={{width:'100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} key={index}>
                            <span>{word.english} - {word.chinese.join(', ')}</span>
                            <div>
                                <button className="edit-button" onClick={() => handleEditWord(word)}>编辑</button>
                                <button className="delete-button" onClick={() => handleDeleteWord(word)}>删除</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {isExpanded && editingWord && (
                <div className="edit-modal">
                    <h3>编辑单词</h3>
                    <input 
                        type="text" 
                        value={editForm.english} 
                        onChange={(e) => setEditForm({ ...editForm, english: e.target.value })} 
                        placeholder="英文" 
                        required 
                    />
                    {editForm.chinese.map((chineseWord, index) => (
                        <input 
                            key={index} 
                            type="text" 
                            value={chineseWord} 
                            onChange={(e) => {
                                const newChinese = [...editForm.chinese];
                                newChinese[index] = e.target.value;
                                setEditForm({ ...editForm, chinese: newChinese });
                            }} 
                            placeholder={`中文词语 ${index + 1}`} 
                            required 
                        />
                    ))}
                    <button onClick={() => setEditForm({ ...editForm, chinese: [...editForm.chinese, ''] })}>
                        添加中文
                    </button>
                    <button onClick={handleConfirmEdit}>确认修改</button>
                    <button onClick={handleCancelEdit}>取消</button>
                </div>
            )}
            {isEdited && isExpanded && (
                <>
                    <button onClick={handleConfirmEditList}>确认修改单词表</button>
                    <button onClick={handleCancelEditList}>取消修改单词表</button>
                </>
            )}
        </div>
    );
};

export default WordListEditor;