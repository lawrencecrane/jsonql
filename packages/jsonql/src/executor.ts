import { Request } from './request'
import { Types, Model, Schema } from './schema'
import { parseRequest } from './parser'
import { Resolver } from './resolver'

async function parallelQueryReducer<
    C,
    T extends Types,
    M extends Model<T>,
    R extends Request<T, M>
>(
    resolver: Resolver<C, T, M>,
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

export function createExecutor<
    C,
    T extends Types,
    M extends Model<T>,
    S extends Schema<T>
>(schema: S, resolver: Resolver<C, T, M>, reducer = parallelQueryReducer) {
    // TODO: validate resolver against schema
    // Check: custom value type validators should exist...

    schema.inputTypeValidatorMap = {
        string: (x) => typeof x === 'string',
        number: (x) => typeof x === 'number',
        boolean: (x) => typeof x === 'boolean',
        ...schema.inputTypeValidatorMap,
    }

    return async function (context: C, data: any): Promise<any> {
        const queries = parseRequest<T, M, S>(schema, data)

        return queries.isNone()
            ? Promise.reject(INVALID_QUERIES)
            : reducer(resolver, context, queries.getOrThrow())
    }
}

export default createExecutor
