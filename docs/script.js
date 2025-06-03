document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const restartBtn = document.getElementById('restart-btn');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');

    // 游戏常量
    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;

    // 游戏变量
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    let gameInterval;
    let gameSpeed = 150; // 毫秒
    let isPaused = false;
    let isGameOver = true;

    // 初始化游戏
    function initGame() {
        // 初始化蛇
        snake = [
            {x: 5, y: 10},
            {x: 4, y: 10},
            {x: 3, y: 10}
        ];
        
        // 初始化方向
        direction = 'right';
        nextDirection = 'right';
        
        // 初始化分数
        score = 0;
        scoreElement.textContent = '分数: ' + score;
        highScoreElement.textContent = '最高分: ' + highScore;
        
        // 生成食物
        generateFood();
        
        // 游戏状态
        isGameOver = false;
        isPaused = false;
        
        // 清除之前的定时器
        if (gameInterval) clearInterval(gameInterval);
        
        // 开始游戏循环
        gameInterval = setInterval(gameLoop, gameSpeed);
    }

    // 游戏主循环
    function gameLoop() {
        if (isPaused || isGameOver) return;
        
        // 更新蛇的位置
        updateSnake();
        
        // 检查碰撞
        if (checkCollision()) {
            gameOver();
            return;
        }
        
        // 检查是否吃到食物
        if (snake[0].x === food.x && snake[0].y === food.y) {
            eatFood();
        } else {
            // 如果没吃到食物，移除蛇尾
            snake.pop();
        }
        
        // 绘制游戏
        drawGame();
    }

    // 更新蛇的位置
    function updateSnake() {
        // 更新方向
        direction = nextDirection;
        
        // 获取蛇头
        const head = {x: snake[0].x, y: snake[0].y};
        
        // 根据方向移动蛇头
        switch(direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }
        
        // 添加新的蛇头
        snake.unshift(head);
    }

    // 检查碰撞
    function checkCollision() {
        const head = snake[0];
        
        // 检查是否撞墙
        if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
            return true;
        }
        
        // 检查是否撞到自己（从第二个身体部分开始检查）
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        
        return false;
    }

    // 生成食物
    function generateFood() {
        // 随机生成食物位置
        let newFood;
        let foodOnSnake;
        
        do {
            foodOnSnake = false;
            newFood = {
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight)
            };
            
            // 检查食物是否生成在蛇身上
            for (let segment of snake) {
                if (segment.x === newFood.x && segment.y === newFood.y) {
                    foodOnSnake = true;
                    break;
                }
            }
        } while (foodOnSnake);
        
        food = newFood;
    }

    // 吃食物
    function eatFood() {
        // 增加分数
        score += 10;
        scoreElement.textContent = '分数: ' + score;
        
        // 更新最高分
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = '最高分: ' + highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // 生成新食物
        generateFood();
        
        // 加速（可选）
        if (score % 50 === 0 && gameSpeed > 60) {
            gameSpeed -= 10;
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, gameSpeed);
        }
    }

    // 游戏结束
    function gameOver() {
        isGameOver = true;
        clearInterval(gameInterval);
        
        // 绘制游戏结束画面
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('游戏结束!', canvas.width / 2, canvas.height / 2 - 30);
        
        ctx.font = '20px Arial';
        ctx.fillText(`得分: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('按"开始游戏"重新开始', canvas.width / 2, canvas.height / 2 + 40);
    }

    // 绘制游戏
    function drawGame() {
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制蛇
        snake.forEach((segment, index) => {
            // 蛇头和身体使用不同颜色
            if (index === 0) {
                ctx.fillStyle = '#2ecc71'; // 蛇头颜色
            } else {
                ctx.fillStyle = '#27ae60'; // 蛇身颜色
            }
            
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
        });
        
        // 绘制食物
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
        
        // 绘制网格（可选）
        if (false) { // 设置为true可以显示网格
            ctx.strokeStyle = '#ecf0f1';
            ctx.lineWidth = 0.5;
            
            // 绘制垂直线
            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            // 绘制水平线
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        }
    }

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        // 防止方向键滚动页面
        if ([37, 38, 39, 40, 65, 87, 68, 83].includes(e.keyCode)) {
            e.preventDefault();
        }
        
        // 只有在游戏进行中才能改变方向
        if (isGameOver || isPaused) return;
        
        // 根据按键改变方向（防止180度转弯）
        switch(e.keyCode) {
            // 上: 箭头上 或 W
            case 38:
            case 87:
                if (direction !== 'down') nextDirection = 'up';
                break;
            // 下: 箭头下 或 S
            case 40:
            case 83:
                if (direction !== 'up') nextDirection = 'down';
                break;
            // 左: 箭头左 或 A
            case 37:
            case 65:
                if (direction !== 'right') nextDirection = 'left';
                break;
            // 右: 箭头右 或 D
            case 39:
            case 68:
                if (direction !== 'left') nextDirection = 'right';
                break;
        }
    });

    // 按钮控制
    startBtn.addEventListener('click', () => {
        if (isGameOver) {
            initGame();
        } else if (isPaused) {
            isPaused = false;
            pauseBtn.textContent = '暂停';
        }
    });

    pauseBtn.addEventListener('click', () => {
        if (!isGameOver) {
            isPaused = !isPaused;
            pauseBtn.textContent = isPaused ? '继续' : '暂停';
        }
    });

    restartBtn.addEventListener('click', () => {
        initGame();
    });

    // 移动端方向按钮控制
    upBtn.addEventListener('click', () => {
        if (!isGameOver && !isPaused && direction !== 'down') {
            nextDirection = 'up';
        }
    });

    downBtn.addEventListener('click', () => {
        if (!isGameOver && !isPaused && direction !== 'up') {
            nextDirection = 'down';
        }
    });

    leftBtn.addEventListener('click', () => {
        if (!isGameOver && !isPaused && direction !== 'right') {
            nextDirection = 'left';
        }
    });

    rightBtn.addEventListener('click', () => {
        if (!isGameOver && !isPaused && direction !== 'left') {
            nextDirection = 'right';
        }
    });

    // 触摸控制（适用于移动设备）
    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        e.preventDefault();
    }, false);

    canvas.addEventListener('touchmove', (e) => {
        if (isGameOver || isPaused) return;
        e.preventDefault();
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        
        // 确定滑动方向（水平或垂直）
        if (Math.abs(dx) > Math.abs(dy)) {
            // 水平滑动
            if (dx > 0 && direction !== 'left') {
                nextDirection = 'right';
            } else if (dx < 0 && direction !== 'right') {
                nextDirection = 'left';
            }
        } else {
            // 垂直滑动
            if (dy > 0 && direction !== 'up') {
                nextDirection = 'down';
            } else if (dy < 0 && direction !== 'down') {
                nextDirection = 'up';
            }
        }
        
        // 更新触摸起始点
        touchStartX = touchEndX;
        touchStartY = touchEndY;
    }, false);

    // 初始绘制
    drawGame();
    
    // 显示开始画面
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('贪吃蛇游戏', canvas.width / 2, canvas.height / 2 - 30);
    
    ctx.font = '20px Arial';
    ctx.fillText('按"开始游戏"开始', canvas.width / 2, canvas.height / 2 + 20);
    
    // 显示最高分
    highScoreElement.textContent = '最高分: ' + highScore;
});