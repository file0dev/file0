import {createElement, RxList} from "axii";
import {DirItem} from "./App.js";
import {Folder} from "./icons/Folder.js";
import {File} from "./icons/File.js";

export type ColumnProps = {
    items: RxList<DirItem>,
    onOpenItem: (item: DirItem) => void,
    selected?: DirItem | null
}



export function Column({ items, onOpenItem }: ColumnProps) {
    const columnStyle = {
        padding: '8px 0',
    }

    const nameStyle = {
        paddingLeft: 4,
        userFocus: 'none',
        userSelect: 'none',
    }

    const itemsWithUniqueMatch = items.createUniqueMatch()

    const onDoubleClick = (item: DirItem) => {
        itemsWithUniqueMatch.set(item)
        onOpenItem(item)
    }

    return (
        <div style={columnStyle}>
            {itemsWithUniqueMatch.map((selected, item) => {
                const itemStyle = () => ({
                    background: selected() ? '#2f5aae' : 'transparent',
                    padding: '4px 8px',
                    margin: '0 8px',
                    fontSize: 16,
                    borderRadius: 4,
                    cursor: 'pointer',
                    '&:hover': {
                        background: '#1e1e1e',
                    },
                    userFocus: 'none',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                })
                return (
                    <div style={itemStyle} onClick={() => itemsWithUniqueMatch.set(item)} ondblclick={() => onDoubleClick(item)}>
                        {item.type=== 'dir' ? <Folder size={20} /> : <File size={20}/>}
                        <span style={nameStyle}>
                            {item.name}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
