import {createElement, FixedCompatiblePropsType, PropsType, PropTypes} from "axii";
import {DirItem} from "./App.js";
import { common} from 'axii-ui/themes/inc.js'


export const LocationPanelPropTypes = {
    fixedItems: PropTypes.rxList<DirItem>().isRequired,
    pinedItems: PropTypes.rxSet<DirItem>().isRequired,
    onOpenItem: PropTypes.function.isRequired

}

export function LocationPanel(props: FixedCompatiblePropsType<typeof LocationPanelPropTypes>) {
    const { fixedItems, onOpenItem, pinedItems } = props as PropsType<typeof LocationPanelPropTypes>
    const containerStyle = {
        background:'#252424',
        height:'100%',
        ...common.layout.flexColumnStretched({gap: common.sizes.space.gap(2)}),
        ...common.boxPaddingContainer,
        borderRight: '1px #000 solid',
    }

    const itemsContainerStyle = {
        ...common.layout.flexColumnStretched({gap: common.sizes.space.gap()}),
        marginTop: common.sizes.space.gap(),
        cursor:'pointer'
    }

    const titleStyle = {
        color: common.colors.text.normal(true, "supportive"),
    }
    return (
        <div style={containerStyle}>
            <div>
                <div style={titleStyle}>Local</div>
                <div style={itemsContainerStyle}>
                    {fixedItems.map((item) => (
                        <div onClick={() => onOpenItem(item)}>{item.name}</div>
                    ))}
                </div>
            </div>
            <div>
                <div style={titleStyle}>Pined</div>
                <div style={itemsContainerStyle}>
                    {pinedItems.toList().map((item) => (
                        <div onClick={() => onOpenItem(item)}>{item.name}</div>
                    ))}
                </div>
            </div>


        </div>
    )
}

LocationPanel.propTypes = LocationPanelPropTypes
