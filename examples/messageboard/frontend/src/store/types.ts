import { schema } from 'types'

export type Updater = {
    [K in keyof typeof schema.QUERIES]?: (x: any) => void
}
