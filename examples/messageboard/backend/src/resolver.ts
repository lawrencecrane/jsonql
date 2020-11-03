import WebSocket from 'ws'
import { schema } from 'types'
import { Query, getSpecificFields } from 'ts-jsonql'
import { Message } from 'types/dist/types'

export interface StatefulWebSocket extends WebSocket {
    subscriptions?: {
        messages: Query
    }
}

export interface Context {
    initiator: StatefulWebSocket
    all: Set<StatefulWebSocket>
}

export const resolver: schema.Resolver<Context> = {
    messages: (context, query) => {
        context.initiator.subscriptions = {
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

        // TODO: send to Kafka or similar,
        // so that we can have multiple instances of this webserver
        ;[...context.all].forEach((ws) => {
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

        return Promise.resolve()
    },
}

export default resolver
