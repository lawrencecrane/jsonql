export const toDictionary = <T extends {}>(x: any): T => x || {}

export const chainPromiseCreators = async (
    ...fs: (() => Promise<any>)[]
): Promise<any> => fs.reduce((prev, f) => prev.then(f), Promise.resolve())

export const None = Symbol()

export type Maybe<T> = typeof None | T

export const isNone = <T>(x: Maybe<T>): x is typeof None => x === None

export const isJust = <T>(x: Maybe<T>): x is T => !isNone(x)
