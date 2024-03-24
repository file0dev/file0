import {DirItem} from "./App.js";
// @ts-ignore
import fs from "socket:fs/promises";

type Instruments = {
    [k: string]: (...args: any) => Promise<any>
}
const instruments:Instruments = {
    async readdir(base: string): Promise<DirItem[]> {
        const items = await fs.readdir(base)
        return Promise.all(items.map(async (item:string) => {
            const path = `${base}/${item}`
            const stat = await fs.stat(path)
            return {
                ...stat,
                path,
                name: item,
                type: stat.isDirectory() ? 'dir' : 'file'
            }
        }))
    }
}

export function createAPIProxy(baseUrl: string) {
    return new Proxy({}, {
        get(target, apiName) {
            return async function(...args: any[]) {
                if (instruments[apiName as string]) {
                    return instruments[apiName as string](...args)
                }
                return fs[apiName as string](...args)
            }
        }
    }) as {[k:string]: (...args:any) => Promise<any>}
}

