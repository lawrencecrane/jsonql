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
        inputs: TypeInput[]
        output: keyof T
    }
}

export interface Types {
    [key: string]: Type
}

export interface Type {
    // TODO: Should we only allow TypeField here, and add valueType -field to it?
    // Would only be used for documentation?
    fields: (TypeField | string)[]
}

// TODO: Should valueType be renamed to type and type to name?
export interface TypeField {
    type: string
}

export interface TypeInput {
    name: string
    valueType: string
}
