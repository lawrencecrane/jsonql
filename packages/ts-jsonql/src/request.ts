import { Schema, Typings, isTypeField } from './schema'

export type Request<Keys extends string> = {
    [K in Keys]?: Query
}

export interface Query<T extends string | number | symbol = string> {
    inputs?: {
        [key: string]: any
    }
    fields?: (QueryField<T> | T)[]
}

export const isQueryField = <T extends string | number | symbol>(
    x: QueryField<T> | T
): x is QueryField<T> => (x as QueryField).name !== undefined

export interface QueryField<T extends string | number | symbol = string> {
    name: T
    fields: (QueryField<T> | T)[]
}

export const generateQueries = <
    InputTypes extends string,
    Types extends string,
    ModelKeys extends string
>(
    schema: Schema<InputTypes, Types, ModelKeys>,
    maxRecursion = 4
): Request<ModelKeys> =>
    Object.keys(schema.model).reduce(
        (queries: Request<ModelKeys>, key: ModelKeys) => {
            queries[key] = {
                fields: reduceFields(
                    schema.types,
                    schema.model[key].output.type,
                    maxRecursion
                ),
            }

            return queries
        },
        {}
    )

const reduceFields = <Types extends string>(
    types: Typings<Types>,
    type: Types,
    maxRecursion = 4,
    currentRecursion = 0
): (QueryField | string)[] => {
    if (maxRecursion === currentRecursion) {
        return []
    }

    return types[type].fields.map((field) => {
        if (isTypeField(field)) {
            return {
                name: field.name,
                fields: reduceFields(
                    types,
                    field.type,
                    maxRecursion,
                    currentRecursion + 1
                ),
            }
        }

        return field
    })
}
