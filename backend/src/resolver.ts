import socketIo from 'socket.io'
import { Resolver } from 'jsonql'
import { Model, Types } from './schema'

export interface Context {
    socket: socketIo.Socket
}

export const resolver: Resolver<Context, Types, Model> = {
    messages: () =>
        Promise.resolve([
            { user: 'joe', message: 'Hello from the otherside!' },
        ]),
}

export default resolver
