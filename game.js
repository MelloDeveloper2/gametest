// Create a canvas element
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Square properties
let squareX = 50;
let squareY = 50;
const squareSize = 50;

// Draw square function
function drawSquare() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
}

// Move square on click
canvas.addEventListener('click', (event) => {
  squareX = event.offsetX - squareSize / 2;
  squareY = event.offsetY - squareSize / 2;
  drawSquare();
});

// Chat system
const chatMessages = document.createElement('div');
document.body.appendChild(chatMessages);

function sendMessage(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}

// Example usage
sendMessage('Welcome to the game! Click to move the square.');

// Initial square draw
drawSquare();

// Updates for a chat system button
