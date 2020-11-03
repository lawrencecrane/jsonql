import { Schema, Typings, isTypeField } from './schema'

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
