export interface Schema<T extends Types> {
    inputTypeValidatorMap: ValueTypeValidatorMap
    types: T
    model: Model<T>
}

export interface ValueTypeValidatorMap {
    [key: string]: (x: any) => boolean
}

export type Model<T extends Types> = {
    [key: string]: {
        inputTypes: TypeInput[]
        output: {
            type: keyof T
            isList?: boolean
        }
    }
}

export interface Types {
    [key: string]: Type
}

export interface Type {
    fields: (TypeField | string)[]
}

export interface TypeField {
    name: string
    type: string
}

export interface TypeInput {
    name: string
    type: string
}
