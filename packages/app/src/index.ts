import Fastify, {FastifyLoggerOptions, FastifyReply, FastifyRequest} from 'fastify'
import * as fs from 'fs/promises'
import {createAPI, useFastAPI} from "./createAPI.js";

import cors from '@fastify/cors'


const fastify = Fastify({
    logger: true
})

await fastify.register(cors, {
    // put your options here
})



// const readdir = createDataAPI(fs.readdir, { params: ['string'] })

const readdir = createAPI(async function readdir(base: string) {
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
}, {params: ['string']})

const rename = createAPI(fs.rename, { params: ['string', 'string'] })
const readFile = createAPI(fs.readFile, { params: ['string'] })
const writeFile = createAPI(fs.writeFile, { params: ['string', 'string'] })
const unlink = createAPI(fs.unlink, { params: ['string'] })



useFastAPI(fastify,{
    rename,
    readdir,
    readFile,
    writeFile,
    unlink
})

fastify.listen({ port: 8081, host:'localhost' }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})
