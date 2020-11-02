import { Query } from './request'

export type Resolver<C, Keys extends string> = {
    [K in Keys]: Handler<C, any>
}

export type Handler<C, T> = (context: C, query?: Query) => Promise<T>
