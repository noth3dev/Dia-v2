
        const canvas = document.getElementById("pongCanvas");
        const ctx = canvas.getContext("2d");
        const scoreElement = document.getElementById("currentScore");

        const currentScoreElement = document.getElementById("currentScore");
        const maxScoreElement = document.getElementById("maxScore");
        const startButton = document.getElementById("startButton");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let balls = []; 
        let paddle = {
            width: 100,
            height: 10,
            x: (canvas.width - 100) / 2,
            y: canvas.height - 10,
            speed: 10,
            rightPressed: false,
            leftPressed: false
        };

        let score = 0; 
        let maxScore = 0; 
        let gameStarted = false; 

        function addBall() {
    if (balls.length >= 5) {
        startButton.disabled = true; 
        startButton.innerText = "공 최대 추가됨"; 
        return;
    }
    let ball = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 10,

        dx: (Math.random() - 0.5) * 8, 
        dy: (Math.random() - 0.5) * 8, 
        speed: 4 
    };
    balls.push(ball);
}

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                paddle.rightPressed = true;
            } else if (e.key == "Left" || e.key == "ArrowLeft") {
                paddle.leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                paddle.rightPressed = false;
            } else if (e.key == "Left" || e.key == "ArrowLeft") {
                paddle.leftPressed = false;
            }
        }

        function drawBall(ball) {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#007bff";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();
        }

        function moveBall(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.radius > canvas.height) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
            score++;
            scoreElement.innerText = `Score: ${score}`;
            currentScoreElement.innerText = `현재 스코어: ${score}`;
        } else {
            if (score > maxScore) {
                maxScore = score;
                maxScoreElement.innerText = `최대 스코어: ${maxScore}`;
            }
            document.location.reload();
        }
    }
}


        function movePaddle() {
            if (paddle.rightPressed && paddle.x < canvas.width - paddle.width) {
                paddle.x += paddle.speed;
            } else if (paddle.leftPressed && paddle.x > 0) {
                paddle.x -= paddle.speed;
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            drawPaddle();
            balls.forEach((ball) => {
                drawBall(ball);
                moveBall(ball);
            });
            movePaddle();
            requestAnimationFrame(draw);
        }

        startButton.addEventListener("click", function() {
            if (!gameStarted) {
                gameStarted = true;
                addBall();
                startButton.innerText = "공 추가하기"; 

                currentScoreElement.style.display = "block";
                maxScoreElement.style.display = "block";
            } else {
                addBall();
            }
        });

        draw();