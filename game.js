// Connect to the server
const socket = io();

// Get references to DOM elements
const statusElement = document.getElementById('status');
const playerCountElement = document.getElementById('playerCount');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Store player positions
const players = {};

// Handle player connections
socket.on('playerConnected', (data) => {
    console.log('Player connected:', data.id);
    players[data.id] = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
    updatePlayerCount();
});

// Handle player disconnections
socket.on('playerDisconnected', (data) => {
    console.log('Player disconnected:', data.id);
    delete players[data.id];
    updatePlayerCount();
});

// Handle player movement
socket.on('playerMove', (data) => {
    if (players[data.id]) {
        players[data.id].x = data.x;
        players[data.id].y = data.y;
    }
});

// Update player count display
function updatePlayerCount() {
    playerCountElement.textContent = `Players: ${Object.keys(players).length}`;
}

// Game loop to update and render the game
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw players
    for (let id in players) {
        const player = players[id];
        ctx.beginPath();
        ctx.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.stroke();
    }
    
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Handle player movement input (example for mouse movement)
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Send player movement to the server
    socket.emit('playerMove', { x, y });
});
