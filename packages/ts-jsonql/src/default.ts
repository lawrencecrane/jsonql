import { InputTypeValidatorMap } from './schema'

export type DefaultInputTypes = 'string' | 'number' | 'boolean'

export const DefaultInputTypeValidatorMap: InputTypeValidatorMap<DefaultInputTypes> = {
    string: (x) => typeof x === 'string',
    number: (x) => typeof x === 'number',
    boolean: (x) => typeof x === 'boolean',
}
