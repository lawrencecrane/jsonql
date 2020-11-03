import { Query, QueryField, isQueryField } from './request'

export type Resolver<C, Keys extends string> = {
    [K in Keys]: Handler<C, any>
}

export type Handler<C, T> = (context: C, query?: Query) => Promise<T>

export const getSpecificFields = <T extends {}, K extends keyof T>(
    x: T,
    fields: (QueryField<K> | K)[],
    maxRecursion = 4,
    currentRecursion = 0
): Partial<T> => {
    if (maxRecursion === currentRecursion) {
        return {}
    }

    return (fields || []).reduce((acc: Partial<T>, field) => {
        if (isQueryField(field)) {
            acc[field.name] = getSpecificFields(
                x[field.name] as any,
                field.fields,
                maxRecursion,
                currentRecursion + 1
            ) as any
        } else {
            acc[field] = x[field]
        }

        return acc
    }, {})
}
