import App from './App.svelte'
import { store } from './store'

const app = new App({
    target: document.body,
})

store.name.set('hello from the otherside!')

export default app
