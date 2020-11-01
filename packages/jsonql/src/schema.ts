export type Schema<
    InputTypes extends string = string,
    Types extends string = string,
    ModelKeys extends string = string
> = {
    inputTypeValidatorMap: InputTypeValidatorMap<InputTypes>
    types: {
        [K in Types]: Type<Types>
    }
    model: Model<ModelKeys, InputTypes, Types>
}

export type InputTypeValidatorMap<Keys extends string = string> = {
    [K in Keys]: (x: any) => boolean
}

export type Model<
    Keys extends string = string,
    InputType extends string = string,
    OutputType extends string = string
> = {
    [K in Keys]: {
        inputTypes: TypeInput<InputType>[]
        output: {
            type: OutputType
            isList?: boolean
        }
    }
}

export interface Type<T extends string = string> {
    fields: (TypeField<T> | string)[]
}

export interface TypeField<T extends string = string> {
    name: string
    type: T
}

export interface TypeInput<T extends string = string> {
    name: string
    type: T
}
