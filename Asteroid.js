class Asteroid {
    constructor(x, y, level) {
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth);
        this.y = y || Math.floor(Math.random() * canvasHeight);
        this.speed = 0.5;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
        this.level = level || 1;
        switch (this.level) {
            case 1:
                this.radius = 50;
                break;
            case 2:
                this.radius = 25;
                break;
            case 3:
                this.radius = 15;
        }
        this.collisionRadius = this.radius - this.radius / 100 * 2;
    }
    update() {
        let radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        checkBorder(this);
    }
    draw() {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        let radians = this.angle / Math.PI * 180;
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians))
        }
        ctx.closePath();
        ctx.stroke();
    }
}