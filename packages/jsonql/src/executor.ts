import { Request } from './request'
import { Schema } from './schema'
import { parseRequest } from './parser'
import { Resolver } from './resolver'

async function parallelQueryReducer<Context, ModelKeys extends string>(
    resolver: Resolver<Context, ModelKeys>,
    context: Context,
    queries: Request<ModelKeys>
): Promise<{ [K in keyof Request<ModelKeys>]: any }> {
    const keys = Object.keys(queries)

    return Promise.all(
        keys.map((k) =>
            resolver[k as ModelKeys](context, queries[k as ModelKeys])
        )
    ).then((res) =>
        keys.reduce((out: { [key: string]: any }, key, i) => {
            out[key] = res[i]
            return out
        }, {})
    ) as any
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
    reducer = parallelQueryReducer
) {
    return async function (context: Context, data: any): Promise<any> {
        const queries = parseRequest(schema, data)

        return queries.isNone()
            ? Promise.reject(INVALID_QUERIES)
            : reducer(resolver, context, queries.getOrThrow())
    }
}

export default createExecutor
