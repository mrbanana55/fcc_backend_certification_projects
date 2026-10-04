import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';


const server = http.createServer((req, res)=>{
    fs.readFile('./public/index.html', (err, data)=>{
        if (err){
            return res.writeHead(500, {"Content-Type": "text/plain"}).end("Error loading file")

        }
        res.writeHead(200, {"Content-Type": "text/html"}).end(data)
    })
})

const wss = new WebSocketServer({ server })

wss.on('connection', (socket, req) => {
    const username = new URL(req.url, "http://localhost").searchParams.get("username",);

    wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: "system", text: `${username} joined` }))
    })

    socket.on('message', (message)=>{
        const {username, text} = JSON.parse(message)

        wss.clients.forEach((client) => {
            client.send(JSON.stringify({type: 'chat', username, text}))
        })
        
    })

    socket.on('close', ()=>{
        wss.clients.forEach((client)=>{
            client.send(JSON.stringify({type: 'system', text: `${username} left`}))
        })
    })
})



const PORT = 3001;
server.listen(PORT, ()=>{console.log(`Chat server running at http://localhost:${PORT}`)})
