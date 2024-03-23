/*@jsx createElement*/
import {RenderContext} from "axii";
import {IconProps} from "./type.js";



export function File({ size }: IconProps, { createSVGElement: createElement }: RenderContext) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 24">
            <path fill="currentColor"
                  d="M19.638 8.945a1.08 1.08 0 0 0-.249-.692l.001.002l-.004-.006a1.03 1.03 0 0 0-.063-.069l-.009-.009l-.028-.029L11.463.321a.83.83 0 0 0-.07-.063l-.022-.02l-.054-.04L11.29.18l-.058-.036l-.024-.014c-.027-.015-.054-.027-.081-.039l-.033-.013l-.057-.021L11 .045l-.067-.017l-.026-.006a1.53 1.53 0 0 0-.094-.015h-9.72C.493.007.006.492.002 1.091v21.818C.002 23.512.491 24 1.093 24h17.454c.603 0 1.091-.489 1.091-1.091V8.974l.001-.029zM11.781 3.72l4.13 4.135h-4.13zM2.182 21.818V2.181h7.42v6.767c0 .603.489 1.091 1.091 1.091h6.767v11.779z"/>
        </svg>
    )
}