# 贪吃蛇游戏

一个使用HTML5 Canvas、CSS和JavaScript创建的经典贪吃蛇游戏。

## 游戏特点

- 使用方向键或WASD键控制蛇的移动
- 触摸屏设备支持滑动控制
- 随着得分增加，游戏速度会逐渐加快
- 本地存储保存最高分
- 响应式设计，适配不同屏幕尺寸

## 如何运行

### 在线体验

访问GitHub Pages: [https://zwx2465785268.github.io/snake-game](https://zwx2465785268.github.io/snake-game)

**注意：** 如果你看到"Site not found"错误，请按照以下步骤启用GitHub Pages：

1. 进入仓库设置（Settings）
2. 在左侧菜单中点击"Pages"
3. 在"Source"部分，选择"Deploy from a branch"
4. 在"Branch"下拉菜单中选择"main"，文件夹选择"/docs"
5. 点击"Save"按钮
6. 等待几分钟后，你的游戏将在上述链接可用

### 本地运行

1. 克隆仓库
   ```
   git clone https://github.com/zwx2465785268/snake-game.git
   cd snake-game
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 启动服务器
   ```
   npm start
   ```

4. 在浏览器中访问 `http://localhost:3000`

### 直接运行

如果你不想使用Node.js服务器，也可以直接在浏览器中打开`index.html`文件。

## 游戏控制

- **方向键** 或 **WASD**: 控制蛇的移动方向
- **开始游戏按钮**: 开始新游戏
- **暂停按钮**: 暂停/继续游戏
- **重新开始按钮**: 重置游戏

## 技术栈

- HTML5 Canvas: 游戏渲染
- CSS3: 样式和响应式设计
- JavaScript: 游戏逻辑
- Express.js: 本地服务器

## 许可证

[MIT](LICENSE)
