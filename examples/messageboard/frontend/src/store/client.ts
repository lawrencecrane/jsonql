import { updater } from './store'
import { queryMessages } from './message/action'

export const createClient = (uri: string): WebSocket => {
    const ws = new WebSocket(uri)

    ws.onmessage = (res) => {
        const data = JSON.parse(res.data) || {}

        Object.keys(data).forEach(
            (key) => updater[key] && updater[key](data[key])
        )
    }

    ws.onopen = () => queryMessages(ws)

    return ws
}
