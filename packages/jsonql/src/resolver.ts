import { Query } from './request'
import { Model } from './schema'

export type Resolver<C, M extends Model> = {
    [K in keyof M]: (context: C, query?: Query) => Promise<any>
}
