import {atom, createElement, RenderContext, RxList} from "axii";
import {apis} from "./common.js";
import {LocationPanel} from "./LocationPanel.js";
import {ColumnData, ColumnView, openItemInColumn} from "./ColumnView.js";
import {EditorManager} from "./EditorManager.js";
import {FsAPIs} from "./createWebAPIProxy.js";

export type DirItem = {
    path: string,
    name: string,
    type: 'file' | 'dir'
}

export type AppProps = {
    editorManager: EditorManager
}

export function App({ editorManager }: AppProps, {useLayoutEffect}: RenderContext) {
    const openedFile = atom<DirItem>(null)
    let editorContainerRef!: HTMLElement
    let rightRef!: HTMLElement

    useLayoutEffect(async () => {
        openItem({path: '/users/camus/Work/file0test', name: 'camus', type: 'dir'})
    })

    const fixedLocations: DirItem[] = [
        {
            path: '/users/camus',
            type: 'dir',
            name: 'camus'
        },
        {
            path: '/users/camus/downloads',
            type: 'dir',
            name: 'downloads'
        }
    ]

    const columns = new RxList<ColumnData>([])

    const openFile = async (item: DirItem) => {
        const foundEditor = await editorManager.open(item.path, apis as FsAPIs, editorContainerRef)
        if (!foundEditor) {
            console.log('no editor found for', item)
        }
        openedFile(item)
        rightRef.scrollLeft = rightRef.scrollWidth
    }

    const openItem = async (item: DirItem) => {
        if (item.type === 'file') {
            await openFile(item)
        } else {
            await openItemInColumn(item, undefined, apis.readdir, openFile, columns)
        }
        // 滚动条移动到最右边
        rightRef.scrollLeft = rightRef.scrollWidth
    }



    const containerStyle = {
        display:'flex',
        background:'#151414',
        color:'#fff',
        height:'100%'
    }

    const leftStyle = {
        flexGrow:0,
        flexShrink:0,
        height: '100%',
    }

    const rightStyle = {
        flexGrow:1,
        background:'#10141a',
        height: '100%',
        overflowX:'auto',
        display: 'flex',
        // 不换行
        whiteSpace: 'nowrap',
    }

    const editorContainerStyle = () => ({
        flexShrink: 0,
        height: '100%',
        // TODO 记忆的绝对值。可以通过拖拽调整
        width: openedFile() ? 800: 0,
        background: '#fff',
        color: 'initial'
    })


    return (
        <div style={containerStyle}>
            <div style={leftStyle}>
                <LocationPanel fixedItems={fixedLocations} onOpenItem={openItem}/>
            </div>
            {rightRef = <div style={rightStyle}>
                <ColumnView columns={columns} readdir={apis.readdir} openFile={openFile}/>
                {editorContainerRef = <div style={editorContainerStyle}></div> as HTMLElement}
            </div> as HTMLElement}
        </div>
    )
}
