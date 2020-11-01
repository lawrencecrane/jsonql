import { Query } from './request'

export type Resolver<C, Keys extends string> = {
    [K in Keys]: (context: C, query?: Query) => Promise<any>
}
