import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import createExecutor from 'ts-jsonql'
import schema from './schema'
import resolver from './resolver'

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const executor = createExecutor(schema, resolver)

io.on('connection', (socket) => {
    socket.on('jsonql', (data) => {
        executor({ socket }, data).then((res) => {
            socket.emit('jsonql', res)
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})
