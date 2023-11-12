export class Paddle {
    constructor(canvas, speed, color) {
        this.canvas = canvas;
        this.width = 25;
        this.height = 220;
        this.x;
        this.y;
        this.setPosition();
        this.speed = speed;
        this.score = 0;
        this.color = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
        window.addEventListener("resize", () => {
            this.setPosition();
        })
    }

    setPosition() {
        this.x = canvas.width - 120;
        this.y = (canvas.height - this.height) / 2;
    }

    update(inputHandler) {
        if (inputHandler.keys.includes("w") || inputHandler.keys.includes("W") || inputHandler.keys.includes("ArrowUp")) {
            this.y -= this.speed;
        }
        if (inputHandler.keys.includes("s") || inputHandler.keys.includes("S") || inputHandler.keys.includes("ArrowDown")) {
            this.y += this.speed;
        }
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}