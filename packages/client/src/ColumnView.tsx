import {Column} from './Column.js';
import {atom, Atom, PositionObject, RenderContext, RxList} from 'axii';
import {DirItem} from "./App.js";
import {Contextmenu} from "axii-ui";
import {common, install} from 'axii-ui/themes/inc.js'
install()

export type ColumnData = {
    items: RxList<DirItem>
}

export type ColumnViewProps = {
    columns: RxList<ColumnData>,
    readdir: (path: string) => Promise<DirItem[]>,
    onOpenFile: (item: DirItem) => Promise<any>,
    onOpenDir: (item: DirItem) => Promise<any>,
}

export function ColumnView({ columns, readdir, onOpenFile, onOpenDir }: ColumnViewProps,{createElement}: RenderContext) {
    const style = {
        display: 'flex',
        height: '100%',
    }

    const columnStyle = {
        height: '100%',
        overflow: 'auto',
        borderRight: '1px #000 solid',
        flexShrink: 0,
    }



    const onItemDblClick = (item: DirItem, index:Atom<number>|undefined) => {
        openItemInColumn(item, index, readdir, onOpenFile, onOpenDir, columns)
    }


    return (
        <div as="container" style={style} >
            {columns.map((column, index) => (
                <div style={columnStyle} >
                    <Column
                        as={'column'}
                        {...column}
                        $item:ondblclick={(_:any, __:any, {item}: {item: DirItem}) => onItemDblClick(item, index)}
                    />
                </div>
            ))}


        </div>
    )
}

export async function openItemInColumn(item: DirItem, index: Atom<number>|undefined, readdir: ColumnViewProps['readdir'], openFile:ColumnViewProps['onOpenFile'], onOpenDir: ColumnViewProps['onOpenDir'], columns: RxList<ColumnData>) {
    if (item.type === 'file') {
        return openFile(item)
    }

    const result = await readdir(item.path) as DirItem[]
    columns.splice((index?.() ?? -1) + 1, Infinity, { items: new RxList<DirItem>(result)})
    return onOpenDir?.(item)
}
