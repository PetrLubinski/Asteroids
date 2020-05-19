class Bullet {
    constructor(angle) {
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY;
        this.angle = angle;
        this.height = 4;
        this.width = 4;
        this.velX = 0;
        this.velY = 0;
        this.speed = 10;
        this.velX = 0;
        this.velY = 0;
        this.radius = 2;
    }
    update() {
        let radians = this.angle / Math.PI * 180;

        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
        //checkBorder(this);
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}