import WebSocket from 'ws'
import createExecutor from 'ts-jsonql'
import { schema } from 'types'
import resolver from './resolver'

const PORT = parseInt(process.env.PORT) || 3000

const executor = createExecutor(schema.schema, resolver)

const wss = new WebSocket.Server({ port: PORT })

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        executor({ ws }, JSON.parse(typeof data === 'string' && data))
            .then((res) => ws.send(JSON.stringify(res)))
            .catch(console.error)
    })
})
