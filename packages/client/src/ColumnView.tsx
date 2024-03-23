import {Column, ColumnProps} from './Column';
import {Atom, createElement, RxList} from 'axii';
import {DirItem} from "./App.js";

export type ColumnData = {
    items: RxList<DirItem>
}

export type ColumnViewProps = {
    columns: RxList<ColumnData>,
    readdir: (path: string) => Promise<DirItem[]>,
    openFile: (item: DirItem) => Promise<any>
}

export function ColumnView({ columns, readdir, openFile }: ColumnViewProps) {
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

    return (
        <div style={style}>
            {columns.map((column, index) => (
                <div style={columnStyle} >
                    <Column {...column} onOpenItem={(item) => openItemInColumn(item, index!, readdir, openFile, columns)} />
                </div>
            ))}
        </div>
    )
}

export async function openItemInColumn(item: DirItem, index: Atom<number>|undefined, readdir: ColumnViewProps['readdir'], openFile:ColumnViewProps['openFile'], columns: RxList<ColumnData>) {
    if (item.type === 'file') {
        return openFile(item)
    }

    const result = await readdir(item.path) as DirItem[]
    columns.splice((index?.() ?? -1) + 1, Infinity, { items: new RxList<DirItem>(result)})
}
