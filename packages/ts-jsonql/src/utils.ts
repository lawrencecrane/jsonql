export const toDictionary = <T extends {}>(x: any): T => x || {}

export const chainPromiseCreators = async (
    ...fs: (() => Promise<any>)[]
): Promise<any> => fs.reduce((prev, f) => prev.then(f), Promise.resolve())
