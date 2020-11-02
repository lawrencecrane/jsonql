import { schema } from 'types'

export type Updater = {
    [K in keyof typeof schema.schema.model]?: (x: any) => void
}
