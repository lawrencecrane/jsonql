import { Schema, Types as _Types } from 'jsonql'

export const schema: Schema<_Types> = {
    inputTypeValidatorMap: {},
    types: {
        message: {
            fields: ['user', 'message'],
        },
    },
    model: {
        messages: {
            inputTypes: [],
            output: {
                type: 'message',
                isList: true,
            },
        },
    },
}

export type Types = typeof schema.types
export type Model = typeof schema.model

export default schema
