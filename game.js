// HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiplayer Game</title>
    <style>
        canvas { border: 1px solid black; }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <div id="chatBox"></div>
    <script src="game.js"></script>
</body>
</html>

// JavaScript (game.js)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let squareX = 50;
let squareY = 50;

function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(squareX, squareY, 50, 50);
}

canvas.addEventListener('click', (event) => {
    squareX = event.clientX - canvas.offsetLeft;
    squareY = event.clientY - canvas.offsetTop;
    drawSquare();
});

const chatBox = document.getElementById('chatBox');
chatBox.innerText = 'Prototype 0.1';

