import express from 'express'
import http from 'http'
import sockerIo from 'socket.io'
import jsonQL, { Executor, Schema, Types } from 'jsonql'

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = sockerIo(server)

interface Context {
    socket: sockerIo.Socket
}

const schema: Schema<Types> = {
    inputTypeValidatorMap: {},
    types: {
        message: {
            fields: ['user', 'message'],
        },
    },
    model: {
        messages: {
            inputTypes: [],
            output: {
                type: 'message',
                isList: true,
            },
        },
    },
}

const executor: Executor<Context, typeof schema.types, typeof schema.model> = {
    messages: () =>
        Promise.resolve([
            { user: 'joe', message: 'Hello from the otherside!' },
        ]),
}

const ql = jsonQL(schema, executor)

io.on('connection', (socket) => {
    socket.on('jsonql', (data) => {
        ql({ socket }, data).then((res) => {
            socket.emit('jsonql', res)
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})
