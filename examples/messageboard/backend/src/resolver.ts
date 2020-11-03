import WebSocket from 'ws'
import { schema } from 'types'

export interface Context {
    ws: WebSocket
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
