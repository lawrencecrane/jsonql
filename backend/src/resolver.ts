import { Resolver } from 'jsonql'
import { Context, schema } from './schema'

export const resolver: Resolver<
    Context,
    typeof schema.types,
    typeof schema.model
> = {
    messages: () =>
        Promise.resolve([
            { user: 'joe', message: 'Hello from the otherside!' },
        ]),
}

export default resolver
