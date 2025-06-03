const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 设置静态文件目录
app.use(express.static(__dirname));

// 路由处理
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 处理404错误
app.use((req, res) => {
    res.status(404).send('页面未找到');
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器已启动，请访问 http://localhost:${PORT}`);
});