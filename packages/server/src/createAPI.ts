import Fastify, {FastifyReply, FastifyRequest} from "fastify";

export function assert(condition: any, message: string ) {
    if (!condition) {
        // if (__DEV__) debugger
        throw new Error(message)
    }
}

export type APIHandle = (...rest: any[]) => any
export type APIConfig = {
    params?: any[]|{},
    useNamedParams? :boolean,
    allowAnonymous?: boolean,
    guard?: (req:any, res:any) => any
}
export type API = APIHandle & APIConfig


export type APIs = {
    [k:string] : API
}




type APIClassParam<T extends any> = T & { fromValue: (value: any) => T }

function parseDataAPIParams(inputParams: APIConfig["params"], api: API): APIConfig["params"] {
    if (!api.params) {
        return inputParams
    }

    if (api.useNamedParams) {
        const params = api.params as {[k:string]:any}
        const objectParams = inputParams as {[k:string]:any}

        return Object.fromEntries(Object.entries(objectParams).map(([key, inputParam]) => {
            const param = params[key]

            if (param === undefined) return [key, inputParam]

            if (typeof param === 'string' || inputParam === undefined || inputParam === null) {
                // 'string'|'number'|'boolean'|'object'|'undefined'|'null'
                return [key, inputParam]
            } else if (typeof param === 'function') {
                // 对象
                if (!(param as APIClassParam<any>).fromValue) {
                    throw new Error('Invalid Class param type, missing fromValue')
                }
                return [key, (param as APIClassParam<any>).fromValue(inputParam)]
            } else {
                throw new Error('Invalid param type')
            }

        }))

    } else {
        const params = api.params as any[]

        const arrayParams = inputParams as any[]
        return arrayParams.map((inputParam, index) =>{
            const param = params[index]
            if (param === undefined) return inputParam

            if (typeof param === 'string' || inputParam === undefined || inputParam === null) {
                // 'string'|'number'|'boolean'|'object'|'undefined'|'null'
                return inputParam
            } else if (typeof param === 'function') {
                // 对象
                if (!(param as APIClassParam<any>).fromValue) {
                    throw new Error('Invalid Class param type, missing fromValue')
                }
                return (param as APIClassParam<any>).fromValue(inputParam)
            } else {
                throw new Error('Invalid param type')
            }
        })
    }
}

export function createAPI(handle: APIHandle, config: APIConfig = {}): API {
    assert(!(handle as API).params, `handle seem to be already a api`)
    const { params,  allowAnonymous = false, useNamedParams = false } = config

    if (!useNamedParams) {
        const arrayParams = (params||[]) as any[]
        // 这里的 handle 会默认注入第一个参数为 context，所以下面的判断是 +2
        assert(handle.length < (arrayParams.length || 0) + 2, `Invalid params length, handle length :${handle.length}, params length: ${arrayParams.length}`)
    }

    const api = handle as API
    api.params = params
    api.allowAnonymous = allowAnonymous
    api.useNamedParams = useNamedParams
    return api
}

type MiddlewareConfig = {
    path : string
}

const DEFAULT_CONFIG = {
    path : '/api'
}

// TODO 大对象？
export type APIResult = {
    result: any
}

export function useFastAPI(fastify: ReturnType<typeof Fastify>, dataAPIs: APIs, config: MiddlewareConfig = DEFAULT_CONFIG){
    fastify.post(`${config.path}/:apiName`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as {apiName: string}
        const api = dataAPIs[params.apiName]
        if (!api) {
            throw { statusCode: 404, message: `api ${params.apiName} not found` }
        }

        // 参数
        const apiParams = parseDataAPIParams(request.body as APIConfig["params"], api)

        let result
        if(api.useNamedParams) {
            result = await dataAPIs[params.apiName](apiParams)
        }else {
            result = await dataAPIs[params.apiName](...apiParams as any[])
        }

        return { result } as APIResult
    })
}