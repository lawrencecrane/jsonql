import { schema } from 'types'

export const subscribeToMessages = (ws: WebSocket) =>
    ws.send(JSON.stringify({ messages: schema.QUERIES.messages }))

export const sendMessage = (ws: WebSocket, user: string, message: string) =>
    ws.send(
        JSON.stringify({
            sendMessage: {
                inputs: {
                    user,
                    message,
                },
                ...schema.QUERIES.sendMessage,
            },
        })
    )
