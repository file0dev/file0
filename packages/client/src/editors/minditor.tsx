import {
    scaffold,
    Paragraph,
    Text,
    Heading,
    OLItem,
    ULItem,
    InlineCode,
    Code,
    Link,
    Grid,
    InlineImageBlock,
    DocumentData,
    createBlockTool,
    defaultMarkdownPlugins,
    defaultBlockWidgets,
    createRangeTool,
    createSuggestionTool,
    createTOCTool,
    defaultFormatWidgets,
    defaultSuggestionWidgets
} from 'minditor'
import { createElement, onKey } from 'axii'
import {FsAPIs} from "../common.js";


export const manual = false
export const extensions = ['.mdt.json']
export const encoding = 'utf-8'

export function render(container: HTMLElement, content: string, apis: FsAPIs, file: string) {

    const root = <div/> as HTMLElement
    container.appendChild(root)
    const types = {
        Paragraph,
        Text,
        Heading,
        OLItem,
        ULItem,
        InlineCode,
        Code,
        Link,
        Grid,
        Image: InlineImageBlock
    }

    const plugins = [
        ...defaultMarkdownPlugins,
        createBlockTool(defaultBlockWidgets, {style: {maxWidth:200}}),
        createRangeTool( defaultFormatWidgets ),
        createSuggestionTool(defaultSuggestionWidgets),
    ]

    const data = JSON.parse(content) as DocumentData

    const result = scaffold(root,
        {data, types, plugins},
        {
            debug: false,
            styles: {
                containerLeft: {
                    // 用来放 blockTool
                    width: '200px',
                }
            }
        }
    )
    result.render()

    const onSave = async (e: KeyboardEvent) => {
        e.preventDefault()
        console.log('save', result.doc.toJSON())
        return apis.writeFile(file, JSON.stringify(result.doc.toJSON(), null, 2), {encoding: 'utf-8'})
    }

    root.addEventListener('keydown', onKey('s', {meta: true})(onSave))
    root.addEventListener('keydown', onKey('s', {ctrl: true})(onSave))

}
