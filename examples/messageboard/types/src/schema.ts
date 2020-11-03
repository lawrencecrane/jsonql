import {
    Schema,
    Resolver as _Resolver,
    Request as _Request,
    Handler,
    DefaultInputTypes,
    DefaultInputTypeValidatorMap,
    generateQueries,
} from 'ts-jsonql'
import * as types from './types'

type Types = 'void' | 'user' | 'message'

type ModelKeys = 'messages' | 'sendMessage'

export const schema: Schema<DefaultInputTypes, Types, ModelKeys> = {
    inputTypeValidatorMap: DefaultInputTypeValidatorMap,
    types: {
        void: {
            fields: [],
        },
        user: {
            fields: ['name'],
        },
        message: {
            fields: [
                'message',
                'createdAt',
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
        sendMessage: {
            inputTypes: [
                { name: 'message', type: 'string' },
                { name: 'user', type: 'string' },
            ],
            output: {
                type: 'void',
            },
        },
    },
}

export default schema

export interface Resolver<C> extends _Resolver<C, ModelKeys> {
    messages: Handler<C, Partial<types.Message>[]>
    sendMessage: Handler<C, void>
}

export type Request = _Request<ModelKeys>

export const QUERIES = generateQueries(schema)
