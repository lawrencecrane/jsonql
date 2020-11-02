import socketIo from 'socket.io'
import { Resolver } from 'ts-jsonql'
import { schema } from 'types'

export interface Context {
    socket: socketIo.Socket
}

export const resolver: Resolver<Context, schema.ModelKeys> = {
    messages: () =>
        Promise.resolve([
            { user: 'joe', message: 'Hello from the otherside!' },
        ]),
}

export default resolver
