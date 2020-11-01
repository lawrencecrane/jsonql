export type Request<Keys extends string> = {
    [K in Keys]?: Query
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
