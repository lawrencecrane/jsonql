import App from './App.svelte'
import { store } from './store'
import io from 'socket.io-client'

const app = new App({
    target: document.body,
})

store.name.set('hello from the otherside!')

const socket = io(envThis.__WEBSOCKET_URI__)

socket.on('connect', () => socket.emit('jsonql', 'hello from the otherside'))

export default app
