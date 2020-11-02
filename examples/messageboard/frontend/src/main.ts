import App from './App.svelte'
import { updater } from './store'
import io from 'socket.io-client'
import { queryMessages } from './store/message/action'

const app = new App({
    target: document.body,
})

const socket = io(envThis.__WEBSOCKET_URI__)

socket.on('connect', () => queryMessages(socket))

socket.on('jsonql', (res: any) =>
    Object.keys(res).forEach((key) => updater[key] && updater[key](res[key]))
)

export default app
