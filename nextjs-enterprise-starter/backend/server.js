const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(express.json());

// Sample REST endpoint
app.get('/users', (req, res) => {
  res.json([
    { username: 'alice', role: 'Admin' },
    { username: 'bob', role: 'HR' },
    { username: 'carol', role: 'Finance' }
  ]);
});

// ✅ Add root route so browser doesn't show "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Backend API running 🚀');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Send welcome message
  ws.send(JSON.stringify({
    ts: Date.now(),
    message: 'Welcome! This is a live notification.'
  }));
});

// ✅ Broadcast message to all clients every 15s
function broadcastNotice() {
  const payload = JSON.stringify({
    ts: Date.now(),
    message: 'Server notification at ' + new Date().toLocaleTimeString()
  });
  wss.clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) c.send(payload);
  });
}
setInterval(broadcastNotice, 15000);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`✅ Backend listening on port ${PORT}`));

