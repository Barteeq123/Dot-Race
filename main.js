import {Paddle} from "./paddle.js";
import {InputHandler} from "./inputHandler.js";
import {Ball} from "./ball.js";
import {collidedetect} from "./collidedetect.js";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.setSize(window.innerWidth, window.innerHeight);
        this.balls = [];
        this.inputHandler = new InputHandler();
        this.player = new Paddle(this.canvas, 5, [255, 255, 255]);
        this.intervalTime = 1000;
        this.spawnBallInterval = setInterval(() => this.spawnBall(), this.intervalTime);
        this.shortBallInterval();
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    update() {
        this.player.update(this.inputHandler);
        for (let i = this.balls.length - 1; i >= 0; i--) {
            let ball = this.balls[i];

            if (collidedetect(this.player, ball)) {
                this.balls.splice(i, 1);
                if (ball.variant === 0) {
                    this.player.score++;
                } else if (ball.variant === 1) {
                    this.player.score += 2;
                } else {
                    this.player.score += 3;
                }
            }

            if (ball.x >= this.canvas.width + 15) {
                this.balls.splice(i, 1);
                this.player.score--;
            }

            ball.update(this.player);
        }
    }

    draw(context) {
        this.player.draw(context);
        context.fillStyle = "#ffffff";
        context.font = "bold 48px sans-serif";;
        context.textAlign = 'center';
        context.fillText(this.player.score, canvas.width / 2, 50)
        for (let ball of this.balls) {
            ball.draw(context);
        }
    }

    spawnBall() {
        let variant = Math.floor(Math.random() * 3)

        let min = 150;
        let max = this.canvas.height - 150;

        if (variant === 0) {
            this.balls.push(new Ball(-15, Math.floor(Math.random() * (max - min + 1)) + min, 3, variant, [0, 255, 0]));
        } else if (variant === 1) {
            this.balls.push(new Ball(-15, Math.floor(Math.random() * (max - min + 1)) + min, 4, variant, [255, 255, 0]));
        } else {
            this.balls.push(new Ball(-15, Math.floor(Math.random() * (max - min + 1)) + min, 5, variant, [255, 0, 0]));
        }
    }

    shortBallInterval() {
        setInterval(() => {
            clearInterval(this.spawnBallInterval);
            if (this.intervalTime > 26) {
                this.intervalTime -= 10;
            } else if (this.intervalTime >= 25) {
                this.intervalTime -= 1;
            }
            this.spawnBallInterval = setInterval(() => this.spawnBall(), this.intervalTime);
        }, 5000)
    }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const game = new Game(canvas);

function animate() {
    game.update();
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    game.setSize(window.innerWidth, window.innerHeight);
})