import {FsAPIs} from "./common.js";

type Editor = {
    extensions: string[];
    manual: boolean,
    encoding: string,
    render(...args: any[]): any,
    destroy?(...args: any[]): any
}

// editor 可以注册一个或者多个能打开的文件类型

export class EditorManager {
    public editors: Editor[] = [];
    constructor() {
    }
    install(editor: Editor) {
        this.editors.push(editor)
    }
    installFromNPMPackage(name: string) {

    }
    uninstall() {
    }
    async open(file: string, apis: FsAPIs, container: HTMLElement) {
        // 用文件名后缀来匹配 editor
        const editor = this.editors.find(editor => editor.extensions.some(ext => file.endsWith(ext)))
        if (!editor) {
            return false
        }

        let content: any
        if (!editor.manual) {
            // 将文件内容一次性读出来
            content = await apis.readFile(file, {encoding: editor.encoding})
        }

        editor.render(container, content, apis, file)
        return editor
    }
}
