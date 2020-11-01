export type Schema<
    InputTypes extends string,
    Types extends string,
    ModelKeys extends string
> = {
    inputTypeValidatorMap: InputTypeValidatorMap<InputTypes>
    types: {
        [K in Types]: Type<Types>
    }
    model: Model<InputTypes, Types, ModelKeys>
}

export type InputTypeValidatorMap<Keys extends string> = {
    [K in Keys]: (x: any) => boolean
}

export type Model<
    InputTypes extends string,
    Types extends string,
    ModelKeys extends string
> = {
    [K in ModelKeys]: {
        inputTypes: TypeInput<InputTypes>[]
        output: {
            type: Types
            isList?: boolean
        }
    }
}

export const isTypeField = <T extends string>(
    x: TypeField<T> | string
): x is TypeField<T> => (x as TypeField<string>).name !== undefined

export interface Type<T extends string> {
    fields: (TypeField<T> | string)[]
}

export interface TypeField<T extends string> {
    name: string
    type: T
}

export interface TypeInput<T extends string> {
    name: string
    type: T
}
