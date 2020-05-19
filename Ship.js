class Ship {
    constructor() {
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForvard = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'white';
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight;
        this.collisionRadius = 11;
        this.lives = 3;
        this.shot = 0;
    }

    rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }
    update() {
        let radians = this.angle / Math.PI * 180;
        if (this.movingForvard) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
        checkBorder(this);
        this.velX *= 0.99;
        this.velY *= 0.99;

        this.x -= this.velX;
        this.y -= this.velY;
    }
    draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 3);
        let radians = this.angle / Math.PI * 180;
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);
        for (let i = 0; i < 3; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians))
        }
        ctx.closePath();
        ctx.stroke();
    }
    respawn() {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.velX = 0;
        this.velY = 0;
        this.lives -= 1;
    }
    shoot() {
        bullets.push(new Bullet(this.angle));
        this.shot++;
    }
}