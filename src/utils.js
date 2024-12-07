export function parseInput(input) {
    // 定义最终的对象
    const result = {
        english: "",
        words: []
    };

    // 按行分割输入字符串
    const lines = input.split('\n').map(line => line.trim()).filter(line => line);

    // 遍历每一行
    for (let line of lines) {
        // 处理 Name 行
        if (line.startsWith('/Name/:')) {
            const nameValue = line.replace(/\/Name\/:\s*/, '').trim();
            // 只提取中文和英文字符
            result.english = nameValue.match(/[\u4e00-\u9fa5a-zA-Z]+/g)?.join('') || ""; // 提取中文和英文字符
        }
        // 处理 Word 行
        else if (line.startsWith('/Word/：')) {
            // 跳过 Word 行，继续处理后面的行
            continue;
        } else {
            // 处理单词行，跳过空行或仅包含标点符号的行
            if (!line || /^[，, ]*$/.test(line)) {
                continue; // 如果行为空或仅包含标点符号，跳过
            }

            // 使用中英文逗号和空格分割
            const parts = line.split(/[,，\s]+/); // 使用中英文逗号和空格分割
            const englishWord = parts[0].trim(); // 第一个部分是英文单词
            const chineseWords = parts.slice(1).map(word => word.trim()).filter(word => word); // 剩余部分是中文单词

            // 仅在英文单词存在时添加到结果中
            if (englishWord) {
                result.words.push({
                    english: englishWord,
                    chinese: chineseWords
                });
            }
        }
    }

    return result;
}
