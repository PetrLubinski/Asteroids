let canvas;
let ctx;
let canvasWidth = 1000;
let canvasHeight = 700;
let keys = [];
let asteroids = [];
let bullets = [];
let ship;
let score = 0;
let asteroidsAmount = 8;
let result = 0;
let stageComplete = false;

function setupCanvas() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stageComplete = false;
    ship = new Ship();
    initAsteroids(asteroidsAmount);

    document.body.addEventListener('keydown', (e) => keys[e.keyCode] = true);
    document.body.addEventListener('keyup', (e) => {
        console.log(e.keyCode)
        keys[e.keyCode] = false
        if (e.keyCode === 32 && !stageComplete) {
            ship.shoot();
        }
    });

    render();
}


function initAsteroids(stageAmount) {
    for (let i = 0; i < stageAmount; i++) {
        asteroids.push(new Asteroid());
    }
}

function circleCollision(p1x, p1y, r1, p2x, p2y, r2) {
    let deltaX = p1x - p2x;
    let deltaY = p1y - p2y;
    let radiusSum = r1 + r2;
    if (radiusSum > Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))) {
        return true;
    } else {
        return false;
    }
}
function drawLifes() {
    let startX = 950;
    let startY = 10;
    const points = [[9, 9], [-9, 9]];
    ctx.strokeStyle = 'green';
    for (let i = 0; i < ship.lives; i++) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for (let j = 0; j < points.length; j++) {
            ctx.lineTo(startX + points[j][0], startY + points[j][1])
        }
        ctx.closePath();
        ctx.stroke();
        startX -= 30;
    }
}
function drawScores() {
    ctx.fillStyle = 'green';
    ctx.font = '21px Arial';
    ctx.fillText('SCORE: ' + score.toString(), 200, 35);
}
function checkLives(obj) {
    if (obj.lives <= 0) {
        ship.visible = false;
        ctx.fillStyle = 'brown';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', canvasWidth / 2 - 150, canvasHeight / 2)
    }
}

function checkForWin(obj) {
    if (asteroids.length !== 0) {
        for (let k = 0; k < asteroids.length; k++) {
            if (circleCollision(obj.x, obj.y, obj.collisionRadius, asteroids[k].x, asteroids[k].y, asteroids[k].collisionRadius)) {
                obj.respawn();
            }
        }

    } else {
        ctx.fillStyle = 'brown';
        ctx.font = '50px Arial';
        ctx.fillText('YOU WIN!', canvasWidth / 2 - 150, canvasHeight / 2)

        stageComplete = true;
        ship.visible = false;
        showResult();

    }
}
function checkBorder(obj) {
    if (obj.x < obj.radius) {
        obj.x = canvas.width;
    }
    if (obj.x > canvas.width) {
        obj.x = obj.radius;
    }
    if (obj.y < obj.radius) {
        obj.y = canvas.height;
    }
    if (obj.y > canvas.height) {
        obj.y = obj.radius
    }
}

function showResult() {

    result = score - ship.shot + ship.lives * 10
    ctx.fillStyle = 'green';
    ctx.font = '40px Arial';
    ctx.fillText('Your result ' + result, canvasWidth / 2 - 160, canvasHeight / 2 + 40)
    ctx.fillText('Press Enter to continue', canvasWidth / 2 - 210, canvasHeight / 2 + 80)
}
/*
                        Not working kurwa!
    function nextLevel() {
    keys.length = 0;
    asteroids.length = 0;
    bullets.length = 0;
    score = 0;
    stageComplete = false;
    result = 0;
    asteroidsAmount += 2;
    document.body.addEventListener('click', (e) => {
        setupCanvas();
    })
}*/

function render() {
    if (!stageComplete) {
        ship.movingForvard = keys[38];
        if (keys[39]) {
            ship.rotate(1)
        }
        if (keys[37]) {
            ship.rotate(-1)
        }
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawLifes();
    drawScores();
    checkLives(ship);
    checkForWin(ship);
    if (asteroids.length !== 0 && bullets.length !== 0) {
        for (let l = 0; l < asteroids.length; l++) {

            for (let m = 0; m < bullets.length; m++) {
                if (bullets[m].x < 0 || bullets[m].x > canvasWidth) {
                    bullets.splice(m, 1);
                    break;
                }
                if (bullets[m].y < 0 || bullets[m].y > canvasHeight) {
                    bullets.splice(m, 1);
                    break;
                }
                if (circleCollision(bullets[m].x, bullets[m].y, bullets[m].radius, asteroids[l].x, asteroids[l].y, asteroids[l].collisionRadius)) {
                    if (asteroids[l].level === 1) {
                        asteroids.push(new Asteroid(asteroids[l].x - 5, asteroids[l].y - 5, 2));
                        asteroids.push(new Asteroid(asteroids[l].x + 5, asteroids[l].y + 5, 2));
                    } else if (asteroids[l].level === 2) {
                        asteroids.push(new Asteroid(asteroids[l].x - 5, asteroids[l].y - 5, 3));
                        asteroids.push(new Asteroid(asteroids[l].x + 5, asteroids[l].y + 5, 3));
                    }
                    bullets.splice(m, 1);
                    asteroids.splice(l, 1);
                    score += 20;
                    break;
                }
            }
        }
    }
    if (ship.visible) {
        ship.update();
        ship.draw();
    }

    if (bullets.length !== 0) {
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].update();
            bullets[i].draw();
        }
    }
    if (asteroids.length !== 0) {
        for (let j = 0; j < asteroids.length; j++) {
            asteroids[j].update();
            asteroids[j].draw();
        }
    }

    requestAnimationFrame(render);
}
document.addEventListener('DOMContentLoaded', setupCanvas);

