import {atom, autorun, PositionObject, RenderContext, RxList, RxSet} from "axii";
import {apis, FsAPIs} from "./common.js";
import {LocationPanel} from "./LocationPanel.js";
import {ColumnData, ColumnView, openItemInColumn} from "./ColumnView.js";
import {EditorManager} from "./EditorManager.js";
import {Contextmenu} from "axii-ui";
import {common} from "axii-ui/themes/inc.js";

export type DirItem = {
    path: string,
    name: string,
    type: 'file' | 'dir'
}

export type AppProps = {
    editorManager: EditorManager
}

export const LOCALSTORAGE_PINED_KEY = 'pinedItems'

export function App({ editorManager }: AppProps, {createElement, useLayoutEffect}: RenderContext) {
    const openedFile = atom<DirItem>(null)
    let openedEditor: any
    let editorContainerRef!: HTMLElement
    let rightRef!: HTMLElement


    useLayoutEffect(async () => {
        openItem({path: '/Users/camus/Work/axii-site/public', name: 'camus', type: 'dir'})
    })

    const fixedLocations: DirItem[] = [
        {
            path: '/Users/camus',
            type: 'dir',
            name: 'HOME'
        },
        {
            path: '/Users/camus/Downloads',
            type: 'dir',
            name: 'Downloads'
        },
        {
            path: '/Users/camus/Documents',
            type: 'dir',
            name: 'Documents'
        }
    ]

    const columns = new RxList<ColumnData>([])

    const pinedItems = new RxSet<DirItem>(JSON.parse(localStorage.getItem(LOCALSTORAGE_PINED_KEY) || '[]'))

    autorun(() => {
        localStorage.setItem(LOCALSTORAGE_PINED_KEY, JSON.stringify(pinedItems.toArray()))
    })

    const openFile = async (item: DirItem) => {
        const foundEditor = await editorManager.open(item.path, apis as FsAPIs, editorContainerRef)
        if (!foundEditor) {
            console.log('no editor found for', item)
        }
        openedFile(item)
        rightRef.scrollLeft = rightRef.scrollWidth
        openedEditor = foundEditor
    }

    const onOpenDir = async (item: DirItem) => {
        openedEditor?.destroy?.()
        editorContainerRef.innerHTML = ''
        openedFile(null)
    }

    const openItem = async (item: DirItem) => {
        if (item.type === 'file') {
            await openFile(item)
        } else {
            await openItemInColumn(item, undefined, apis.readdir, openFile, onOpenDir, columns)
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
        flexShrink: 1,
        height: '100%',
        // width: openedFile() ? 800: 0,
        // flexGrow: openedFile() ? 1 : 0,
        background: '#fff',
        color: 'initial',
        overflowY: 'auto',
    })


    // TODO ColumnView maxWidth 的绝对值。可以通过拖拽调整
    const columnViewStyle = {
        maxWidth: openedFile() ? 300 : '100%',
        flexShrink: 0,
        height: '100%',
    }

    const contextmenuPosition = atom<PositionObject>(null)

    const contextmenuStyle = {
        background:common.colors.background.box,
        ...common.layout.flexColumnStretched({gap: common.sizes.space.gap()}),
        '&>*': {
            ...common.boxPaddingContainer,
            ...common.interactableItem,
        }
    }
    const itemOnContextMenu = atom<DirItem>(null)
    const onItemContextMenu = (e:MouseEvent,__:any, {item}: {item: DirItem}) => {
        e.preventDefault()
        itemOnContextMenu(item)
    }
    return (
        <div style={containerStyle}>
            <div style={leftStyle}>
                <LocationPanel fixedItems={fixedLocations} onOpenItem={openItem} pinedItems={pinedItems}/>
            </div>
            {rightRef = <div style={rightStyle}>
                <div style={columnViewStyle} oncontextmenu={(e:MouseEvent) => contextmenuPosition({x: e.clientX, y:e.clientY})}>
                    <ColumnView
                        columns={columns}
                        readdir={apis.readdir}
                        onOpenFile={openFile}
                        onOpenDir={onOpenDir}
                        $column={{'$item:oncontextmenu': onItemContextMenu}}
                    >
                    </ColumnView>
                </div>
                {editorContainerRef = <div style={editorContainerStyle}></div> as HTMLElement}
            </div> as HTMLElement}
            <Contextmenu position={contextmenuPosition}>
                <div style={contextmenuStyle} onClick={() => contextmenuPosition(null)}>
                    {/*<div>{() => itemOnContextMenu()?.name}</div>*/}
                    <div onClick={() => pinedItems.add(itemOnContextMenu()!)}>pin</div>
                    <div>delete</div>
                    <div>rename</div>
                </div>
            </Contextmenu>
        </div>
    )
}
