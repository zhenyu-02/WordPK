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

    return (
        <div style={{width:'80%'}}>
            <h3>{curWordList.english}</h3>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '隐藏子条目' : '展开子条目'}
            </button>
            {isExpanded && (
                <ul>
                    {curWordList.words.map((word, index) => (
                        <li style={{width:'100%'}} key={index}>
                            {word.english} - {word.chinese.join(', ')}
                            <button onClick={() => handleEditWord(word)}>编辑</button>
                            {/* TODO 添加删除按钮 */}
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