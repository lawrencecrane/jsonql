import { schema } from 'types'

export const queryMessages = (ws: WebSocket) =>
    ws.send(JSON.stringify({ messages: schema.QUERIES.messages }))
