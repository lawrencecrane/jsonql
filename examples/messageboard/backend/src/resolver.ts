import WebSocket from 'ws'
import { schema } from 'types'
import { Query, getSpecificFields } from 'ts-jsonql'
import { Message } from 'types/dist/types'

// TODO: remove this, and use stamped user id to store subscribed queries
export interface StatefulWebSocket extends WebSocket {
    subscriptions?: {
        messages?: Query
    }
}

export class Store {
    private wss: WebSocket.Server

    constructor(wss: WebSocket.Server) {
        this.wss = wss
    }

    // TODO: send to Kafka or similar,
    // so that we can have multiple instances of this webserver
    broadcastMessage(message: Message) {
        ;[...(this.wss.clients as Set<StatefulWebSocket>)].forEach((ws) => {
            ws.readyState === WebSocket.OPEN &&
                ws.subscriptions &&
                ws.subscriptions.messages &&
                ws.send(
                    JSON.stringify({
                        messages: [
                            getSpecificFields(
                                message,
                                ws.subscriptions.messages.fields as any
                            ),
                        ],
                    })
                )
        })
    }
}

export interface Context {
    ws: StatefulWebSocket
    store: Store
}

export const resolver: schema.Resolver<Context> = {
    messages: (context, query) => {
        context.ws.subscriptions = {
            ...(context.ws.subscriptions || {}),
            messages: query,
        }

        return Promise.resolve([])
    },
    sendMessage: (context, query) => {
        const message: Message = {
            message: query.inputs.message,
            createdAt: Date.now(),
            user: {
                name: query.inputs.user,
            },
        }

        return Promise.resolve(context.store.broadcastMessage(message))
    },
}

export default resolver
