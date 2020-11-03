import App from './App.svelte'
import { createClient } from './store/client'

const app = new App({
    target: document.body,
})

createClient(envThis.__WEBSOCKET_URI__)

export default app
