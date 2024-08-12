const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (e.g., your game HTML, CSS, and JavaScript)
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Notify other clients when a new user connects
    socket.broadcast.emit('playerConnected', { id: socket.id });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        socket.broadcast.emit('playerDisconnected', { id: socket.id });
    });

    // Handle custom events (e.g., player movement)
    socket.on('playerMove', (data) => {
        socket.broadcast.emit('playerMove', data);
    });
});

// Start the server
const port = 3000; // Ensure this matches the port in your client code
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
