<script lang="ts">
    import { onDestroy } from 'svelte'
    import { Message } from 'types/dist/types'
    import store from './store'

    // -- Properties
    let messages: Message[]
    // --

    const unsubscribe = store.messages.subscribe((value) => {
        messages = value
    })

    onDestroy(unsubscribe)
</script>

<style>
    main {
        padding: 1rem;
        max-width: 900px;
        margin: 0 auto;
    }
</style>

<main>
    {#each messages as message}
        <div>
            <p>{message.message}</p>
        </div>
    {/each}
</main>
