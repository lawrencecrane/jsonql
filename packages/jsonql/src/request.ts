import { Model } from './schema'

export type Request<M extends Model> = {
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
