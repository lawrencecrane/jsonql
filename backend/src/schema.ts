import { Schema, DefaultInputTypes, DefaultInputTypeValidatorMap } from 'jsonql'

type Types = 'message'

export type ModelKeys = 'messages'

export const schema: Schema<DefaultInputTypes, Types, ModelKeys> = {
    inputTypeValidatorMap: DefaultInputTypeValidatorMap,
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

export default schema
