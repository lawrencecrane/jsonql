import {
    Schema,
    Resolver as _Resolver,
    Request as _Request,
    Handler,
    DefaultInputTypes,
    DefaultInputTypeValidatorMap,
} from 'ts-jsonql'
import * as types from './types'

type Types = 'user' | 'message'

type ModelKeys = 'messages'

export const schema: Schema<DefaultInputTypes, Types, ModelKeys> = {
    inputTypeValidatorMap: DefaultInputTypeValidatorMap,
    types: {
        user: {
            fields: ['name'],
        },
        message: {
            fields: [
                'message',
                {
                    name: 'user',
                    type: 'user',
                },
            ],
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

export interface Resolver<C> extends _Resolver<C, ModelKeys> {
    messages: Handler<C, Partial<types.Message>[]>
}

export type Request = _Request<ModelKeys>

export default schema
