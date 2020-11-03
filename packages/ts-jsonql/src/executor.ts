import { Request } from './request'
import { Schema } from './schema'
import { parseRequest } from './parser'
import { Resolver } from './resolver'
import { isNone } from './utils'

async function parallelQueryReducer<Context, ModelKeys extends string>(
    resolver: Resolver<Context, ModelKeys>,
    context: Context,
    queries: Request<ModelKeys>
): Promise<{ [K in keyof Request<ModelKeys>]: any }> {
    const keys = Object.keys(queries) as ModelKeys[]

    return Promise.all(keys.map((k) => resolver[k](context, queries[k]))).then(
        (res) =>
            keys.reduce(
                (out: { [K in keyof Request<ModelKeys>]?: any }, key, i) => {
                    out[key] = res[i]

                    return out
                },
                {}
            )
    )
}

export const INVALID_QUERIES = 'INVALID_QUERIES'

export function createExecutor<
    Context,
    InputTypes extends string,
    Types extends string,
    ModelKeys extends string
>(
    schema: Schema<InputTypes, Types, ModelKeys>,
    resolver: Resolver<Context, ModelKeys>,
    maxRecursion = 4,
    reducer = parallelQueryReducer
) {
    return async function (context: Context, data: any): Promise<any> {
        const queries = parseRequest(schema, data, maxRecursion)

        return isNone(queries)
            ? Promise.reject(INVALID_QUERIES)
            : reducer(resolver, context, queries)
    }
}

export default createExecutor
