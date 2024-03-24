type APIResult = {
    result: any
}

export function createAPIProxy(baseUrl: string) {
    return new Proxy({}, {
        get(target, apiName) {
            return async function(...args: any[]) {
                const response = await fetch(`${baseUrl}/${apiName as string}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(args)
                })
                // TODO handle error
                const result = await response.json() as APIResult
                return result.result
            }
        }
    }) as {[k:string]: (...args:any) => Promise<any>}
}

