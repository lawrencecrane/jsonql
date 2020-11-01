import { Query } from './request'
import { Types, Model } from './schema'

export type Resolver<C, T extends Types, M extends Model<T>> = {
    [K in keyof M]: (context: C, query?: Query) => Promise<any>
}
