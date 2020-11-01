import { Option } from 'prelude-ts'
import { Query, QueryInput, QueryField, Request } from './request'
import {
    Model,
    Schema,
    TypeField,
    Type,
    TypeInput,
    InputTypeValidatorMap,
} from './schema'
import { toDictionary } from './utils'

export const parseRequest = <M extends Model, S extends Schema>(
    schema: S,
    data: any
): Option<Request<M>> => {
    const queries = toDictionary(data)

    return Object.keys(queries).every(
        (k) => schema.model[k] && isQuery(schema, k as any, (queries as any)[k])
    )
        ? Option.of(queries)
        : Option.none()
}

const isQuery = <S extends Schema>(
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
            schema.model[queryName].inputTypes,
            schema.inputTypeValidatorMap
        )

    const hasValidFields =
        !query.fields ||
        validateArray(
            query.fields,
            isQueryField,
            schema,
            schema.types[schema.model[queryName].output.type]
        )

    return hasValidInput && hasValidFields
}

const isQueryInput = (
    data: any,
    inputs: TypeInput[],
    validatorMap: InputTypeValidatorMap
): data is QueryInput => {
    const input = toDictionary<QueryInput>(data)
    const inputType = inputs.find((x) => x.name === input.name)

    return inputType && validatorMap[inputType.type](input.value)
}

const isQueryField = <S extends Schema>(
    data: any,
    schema: S,
    type: Type
): data is QueryField => {
    if (typeof data === 'string') {
        return type.fields.includes(data)
    }

    const field = toDictionary<QueryField>(data)

    const typeField = type.fields.find(
        (x) => (x as TypeField).name === field.name
    ) as TypeField

    return (
        typeField &&
        validateArray(
            field.fields,
            isQueryField,
            schema,
            schema.types[typeField.type]
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
