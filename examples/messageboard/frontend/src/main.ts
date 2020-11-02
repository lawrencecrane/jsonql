import App from './App.svelte'
import { store } from './store'
import io from 'socket.io-client'
import { schema } from 'types'

const app = new App({
    target: document.body,
})

store.name.set('hello from the otherside!')

const socket = io(envThis.__WEBSOCKET_URI__)

const messagesQuery: schema.Request = {
    messages: {
        fields: ['message', { name: 'user', fields: ['name'] }],
    },
}

socket.on('connect', () => socket.emit('jsonql', messagesQuery))

socket.on('jsonql', console.log)

export default app
