import { Request } from './request'
import { Model, Schema } from './schema'
import { parseRequest } from './parser'
import { Resolver } from './resolver'

async function parallelQueryReducer<C, M extends Model, R extends Request<M>>(
    resolver: Resolver<C, M>,
    context: C,
    queries: R
): Promise<{ [K in keyof R]: any }> {
    const keys = Object.keys(queries)

    return Promise.all(keys.map((k) => resolver[k](context, queries[k]))).then(
        (res) =>
            keys.reduce((out: { [key: string]: any }, key, i) => {
                out[key] = res[i]
                return out
            }, {})
    ) as any
}

export const INVALID_QUERIES = 'INVALID_QUERIES'

export function createExecutor<C, M extends Model, S extends Schema>(
    schema: S,
    resolver: Resolver<C, M>,
    reducer = parallelQueryReducer
) {
    return async function (context: C, data: any): Promise<any> {
        const queries = parseRequest<M, S>(schema, data)

        return queries.isNone()
            ? Promise.reject(INVALID_QUERIES)
            : reducer(resolver, context, queries.getOrThrow())
    }
}

export default createExecutor
