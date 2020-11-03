import { schema } from 'types'

export const queryMessages = (socket: SocketIOClient.Socket) =>
    socket.emit('jsonql', schema.QUERIES['messages'])
