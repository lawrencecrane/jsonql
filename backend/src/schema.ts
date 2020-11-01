import socketIo from 'socket.io'
import { Schema, Types } from 'jsonql'

export interface Context {
    socket: socketIo.Socket
}

export const schema: Schema<Types> = {
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

export default schema
