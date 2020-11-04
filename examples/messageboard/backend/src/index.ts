import WebSocket from 'ws'
import createExecutor from 'ts-jsonql'
import { schema } from 'types'
import resolver, { Store } from './resolver'
import { INVALID_QUERIES } from 'ts-jsonql/dist/executor'

const PORT = parseInt(process.env.PORT) || 3000

const executor = createExecutor(schema.schema, resolver)

const wss = new WebSocket.Server({ port: PORT })

const store = new Store(wss)

wss.on('connection', (ws) => {
    // TODO: Use request to stamp user id on ws, and use that user id in resolver
    ws.on('message', (data) => {
        executor({ ws, store }, JSON.parse(typeof data === 'string' && data))
            .then((res) => ws.send(JSON.stringify(res)))
            .catch((err) => {
                if (err === INVALID_QUERIES) {
                    ws.send(JSON.stringify({ error: INVALID_QUERIES }))
                }

                console.error(err)
            })
    })
})
