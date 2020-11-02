import { schema } from 'types'

const messagesQuery: schema.Request = {
    messages: {
        fields: ['message', { name: 'user', fields: ['name'] }],
    },
}

export const queryMessages = (socket: SocketIOClient.Socket) =>
    socket.emit('jsonql', messagesQuery)
