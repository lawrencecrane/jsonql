import { writable } from 'svelte/store'
import { Message } from 'types/dist/types'
import { Updater } from '../types'

export const messages = writable([] as Message[])

export const updater: Updater = {
    messages: (msgs: Message[]) => messages.update((old) => old.concat(msgs)),
}
