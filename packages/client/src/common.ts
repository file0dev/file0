import {createAPIProxy} from "./createWebAPIProxy.js";
// import {createAPIProxy} from "./createSocketAPIProxy.js";

export const apis = createAPIProxy('http://localhost:8081/api')

export type FsAPIs = {
    readdir: (path: string) => Promise<string[]>
    readFile: (path: string, options?: { encoding: string }) => Promise<string>
    writeFile: (path: string, content: string, options:any) => Promise<void>
}