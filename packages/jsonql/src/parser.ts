import { Option } from 'prelude-ts'
import { Query, QueryInput, QueryField, Request } from './request'
import {
    Model,
    Schema,
    Type,
    TypeInput,
    Types,
    ValueTypeValidatorMap,
} from './schema'
import { toDictionary } from './utils'

export const parseRequest = <
    T extends Types,
    M extends Model<T>,
    S extends Schema<T>
>(
    schema: S,
    data: any
): Option<Request<T, M>> => {
    const queries = toDictionary(data)

    return Object.keys(queries).every(
        (k) =>
            schema.model[k] &&
            isQuery<T, S>(schema, k as any, (queries as any)[k])
    )
        ? Option.of(queries)
        : Option.none()
}

const isQuery = <T extends Types, S extends Schema<T>>(
    schema: S,
    queryName: string,
    data: any
): data is Query => {
    const query = toDictionary<Query>(data)

    const hasValidInput =
        !query.inputs ||
        validateArray(
            query.inputs,
            isQueryInput,
            schema.model[queryName].inputs,
            schema.inputTypeValidatorMap
        )

    const hasValidFields =
        !query.fields ||
        validateArray(
            query.fields,
            isQueryField,
            schema,
            schema.types[schema.model[queryName].output]
        )

    return hasValidInput && hasValidFields
}

const isQueryInput = (
    data: any,
    inputs: TypeInput[],
    validatorMap: ValueTypeValidatorMap
): data is QueryInput => {
    const input = toDictionary<QueryInput>(data)
    const inputType = inputs.find((x) => x.name === input.name)

    return inputType && validatorMap[inputType.valueType](input.value)
}

const isQueryField = <T extends Types, S extends Schema<T>>(
    data: any,
    schema: S,
    type: Type
): data is QueryField => {
    // TODO: allow array notation for type, i.e. message[] => message

    if (typeof data === 'string') {
        return type.fields.includes(data)
    }

    const field = toDictionary<QueryField>(data)

    return (
        type.fields.includes({ type: field.name }) &&
        validateArray(
            field.fields,
            isQueryField,
            schema,
            schema.types[field.name]
        )
    )
}

const validateArray = <T extends {}>(
    value: undefined | T[],
    validator: (value: T, ...args: any) => boolean,
    ...args: any[]
) => {
    return Array.isArray(value) && value.every((x) => validator(x, ...args))
}
