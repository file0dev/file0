import {atom, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext, RxList} from "axii";
import {DirItem} from "./App.js";
import {Folder} from "./icons/Folder.js";
import {File} from "./icons/File.js";

const ColumnPropTypes = {
    items: PropTypes.rxList<DirItem>().isRequired,
}



export function Column(props: FixedCompatiblePropsType<typeof ColumnPropTypes>, {createElement}: RenderContext) {
    const {items} = props as PropsType<typeof ColumnPropTypes>
    const columnStyle = {
        padding: '8px 0',
    }

    const nameStyle = {
        paddingLeft: 4,
        userFocus: 'none',
        userSelect: 'none',
    }

    const selectedItem = atom<DirItem>(null)
    const itemsWithUniqueMatch = items.createSelection(selectedItem)

    const onDoubleClick = (item: DirItem) => {
        selectedItem(item)
    }

    return (
        <div as="root" style={columnStyle}>
            {itemsWithUniqueMatch.map(([item, selected]) => {
                const itemStyle = () => ({
                    background: selected() ? '#2f5aae' : 'transparent',
                    padding: '4px 8px',
                    margin: '0 8px',
                    fontSize: 16,
                    borderRadius: 4,
                    cursor: 'pointer',
                    '&:hover': {
                        background: selected() ? '#2f5aae' :'#1e1e1e',
                    },
                    userFocus: 'none',
                    userSelect: 'none',
                    '-webkit-user-select': 'none', // safari
                    display: 'flex',
                    alignItems: 'center',
                })
                return (
                    <div as="item" prop:item={item} style={itemStyle} onClick={() => selectedItem(item)} ondblclick={() => selectedItem(item)}>
                        <span style={{width:20, textAlign:'center'}}>
                            {item.type=== 'dir' ? <Folder size={20} /> : <File size={16}/>}
                        </span>
                        <span style={nameStyle}>
                            {item.name}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
Column.propTypes = ColumnPropTypes