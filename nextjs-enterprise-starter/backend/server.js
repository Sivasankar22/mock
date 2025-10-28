const express = require('express')
const cors = require('cors')
const http = require('http')
const WebSocket = require('ws')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/users', (req,res)=>{
  res.json([
    { username: 'alice', role: 'Admin' },
    { username: 'bob', role: 'HR' },
    { username: 'carol', role: 'Finance' }
  ])
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  console.log('ws connected')
  ws.send(JSON.stringify({ ts: Date.now(), message: 'Welcome! This is a live notification.' }))
})

function broadcastNotice(){
  const payload = JSON.stringify({ ts: Date.now(), message: 'Server notification at ' + new Date().toLocaleTimeString() })
  wss.clients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send(payload) })
}

// broadcast every 15 seconds
setInterval(broadcastNotice, 15000)

const PORT = process.env.PORT || 4000
server.listen(PORT, ()=>console.log('Backend listening on', PORT))
