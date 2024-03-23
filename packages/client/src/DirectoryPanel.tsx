import {createElement, RxList} from "axii";
import {DirItem} from "./App.js";


type DirPanelProps = {
    items: RxList<DirItem>,
    onOpenItem: (item: DirItem) => void
}

export function DirectoryPanel({ items, onOpenItem }: DirPanelProps) {
    return (
        <div>
            {items.map((item) => (
                <div onClick={() => onOpenItem(item)}>{item.name}</div>
            ))}
        </div>
    )
}

