import express from 'express'
import http from 'http'
import sockerIo from 'socket.io'

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = sockerIo(server)

io.on('connection', (socket) => {
    socket.on('jsonql', (data) => {
        console.log(data)
    })
})

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})
