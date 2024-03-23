import {createElement} from "axii";
import {DirItem} from "./App.js";

type LocationPanelProps = {
    fixedItems: DirItem[],
    onOpenItem: (location: DirItem) => void
}

export function LocationPanel({ fixedItems, onOpenItem }: LocationPanelProps) {
    const containerStyle = {
        background:'#252424',
        height:'100%',
        boxSizing:'border-box',
        padding:16,
        borderRight: '1px #000 solid',
        cursor:'pointer'
    }
    return (
        <div style={containerStyle}>
            <div>Local</div>
            <div>
                {fixedItems.map((item) => (
                    <div onClick={() => onOpenItem(item)}>{item.name}</div>
                ))}
            </div>
        </div>
    )
}

