export class Ball {
    constructor(x, y, speed, variant,color) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.speed = speed;
        this.variant = variant;
        this.color = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
    }

    update() {
        this.x += this.speed
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}