const canvas = document.getElementById('gameField');
const ctx = canvas.getContext('2d');
ctx.scale(16, 16);
document.addEventListener('keydown', onKeyDown);

setInterval(update, 100);

let snake = {
    x: 10, y: 10,
    vx: 0, vy: 0,
    tail: 5,
    trail: []
};
const fruit = {
    x: 15, y: 15
};
const map = {
    width: 40,
    height: 25
};

function update() {
    snake.x += snake.vx;
    snake.y += snake.vy;

    if (snake.x < 0) snake.x = map.width - 1;
    if (snake.x > map.width - 1) snake.x = 0;

    if (snake.y < 0) snake.y = map.height - 1;
    if (snake.y > map.height - 1) snake.y = 0;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lime';
    for (let i = snake.trail.length; i--;) {
        let pos = snake.trail[i];
        ctx.fillRect(pos.x, pos.y, 1, 1);

        if (snake.x === pos.x && snake.y === pos.y) {
            snake.tail = 5;
        }
    }

    snake.trail.push({
        x: snake.x,
        y: snake.y
    });

    while (snake.trail.length > snake.tail) {
        snake.trail.shift();
    }

    if (snake.x === fruit.x && snake.y === fruit.y) {
        snake.tail++;

        fruit.x = Math.floor(Math.random()*map.width);
        fruit.y = Math.floor(Math.random()*map.height);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, 1, 1);
}

function onKeyDown(event) {
    switch (event.keyCode) {
        case 37: // left key
            snake.vx = -1;
            snake.vy = 0;
            break;
        case 39: // right key
            snake.vx = 1;
            snake.vy = 0;
            break;
        case 40: // up key
            snake.vx = 0;
            snake.vy = 1;
            break;
        case 38: // down key
            snake.vx = 0;
            snake.vy = -1;
            break;
        default:
    }
}