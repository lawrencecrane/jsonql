import socketIo from 'socket.io'
import { schema } from 'types'

export interface Context {
    socket: socketIo.Socket
}

export const resolver: schema.Resolver<Context> = {
    messages: () =>
        Promise.resolve([
            {
                message: 'Hello from the otherside!',
                user: {
                    name: 'joe',
                },
            },
        ]),
}

export default resolver
