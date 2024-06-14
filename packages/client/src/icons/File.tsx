/*@jsx createElement*/
import {RenderContext} from "axii";
import {IconProps} from "./type.js";


export function File({size}: IconProps, {createSVGElement: createElement}: RenderContext) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 344 432">
            <path fill="currentColor"
                  d="M43 3h170l128 128v256q0 17-12.5 29.5T299 429H42q-17 0-29.5-12.5T0 387V45q0-17 12.5-29.5T43 3zm149 149h117L192 35v117z"/>
        </svg>
    )
}

