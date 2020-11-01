import { Types, Model } from './schema'

export type Request<T extends Types, M extends Model<T>> = {
    [K in keyof M]?: Query
}

export interface Query {
    inputs?: QueryInput[]
    fields?: (QueryField | string)[]
}

export interface QueryField {
    name: string
    fields: (QueryField | string)[]
}

export interface QueryInput {
    name: string
    value: any
}
