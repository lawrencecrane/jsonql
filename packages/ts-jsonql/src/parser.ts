import { Query, QueryInput, QueryField, Request } from './request'
import {
    Schema,
    Type,
    TypeInput,
    InputTypeValidatorMap,
    isTypeField,
} from './schema'
import { toDictionary, Maybe, None } from './utils'

export const parseRequest = <
    InputTypes extends string,
    Types extends string,
    ModelKeys extends string
>(
    schema: Schema<InputTypes, Types, ModelKeys>,
    data: any,
    maxRecursion = 4
): Maybe<Request<ModelKeys>> => {
    const queries = toDictionary<Request<ModelKeys>>(data)

    return Object.keys(queries).every(
        (k) =>
            schema.model[k as ModelKeys] &&
            isQuery(schema, k, queries[k as ModelKeys], maxRecursion)
    )
        ? queries
        : None
}

const isQuery = <
    InputTypes extends string,
    Types extends string,
    ModelKeys extends string
>(
    schema: Schema<InputTypes, Types, ModelKeys>,
    queryName: ModelKeys,
    data: any,
    maxRecursion = 4
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
            schema.types[schema.model[queryName].output.type],
            maxRecursion
        )

    return hasValidInput && hasValidFields
}

const isQueryInput = <InputTypes extends string>(
    data: any,
    inputs: TypeInput<InputTypes>[],
    validatorMap: InputTypeValidatorMap<InputTypes>
): data is QueryInput => {
    const input = toDictionary<QueryInput>(data)
    const inputType = inputs.find((x) => x.name === input.name)

    return inputType && validatorMap[inputType.type](input.value)
}

const isQueryField = <
    InputTypes extends string,
    Types extends string,
    ModelKeys extends string
>(
    data: any,
    schema: Schema<InputTypes, Types, ModelKeys>,
    type: Type<Types>,
    maxRecursion = 4,
    currentRecursion = 0
): data is QueryField => {
    if (maxRecursion === currentRecursion) {
        return false
    }

    if (typeof data === 'string') {
        return type.fields.includes(data)
    }

    const field = toDictionary<QueryField>(data)

    const typeField = type.fields
        .filter(isTypeField)
        .find((x) => x.name === field.name)

    return (
        typeField &&
        validateArray(
            field.fields,
            isQueryField,
            schema,
            schema.types[typeField.type],
            maxRecursion,
            currentRecursion + 1
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
