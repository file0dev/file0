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
    DocumentData
} from 'minditor'


export const manual = false
export const extensions = ['.mdt.json']
export const encoding = 'utf-8'

export function render(container: HTMLElement, content: string, apis: any, file: string) {
    const root = document.createElement('div')
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

    const data = JSON.parse(content) as DocumentData

    const result = scaffold(root, {data, types, plugins:[]}, {debug: false})
    result.render()

    // TODO use apis to save the content
}
