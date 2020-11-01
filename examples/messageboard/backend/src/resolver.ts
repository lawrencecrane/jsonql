import socketIo from 'socket.io'
import { Resolver } from 'ts-jsonql'
import { ModelKeys } from './schema'

export interface Context {
    socket: socketIo.Socket
}

export const resolver: Resolver<Context, ModelKeys> = {
    messages: () =>
        Promise.resolve([
            { user: 'joe', message: 'Hello from the otherside!' },
        ]),
}

export default resolver
