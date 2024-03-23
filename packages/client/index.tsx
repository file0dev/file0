import { createRoot, createElement } from 'axii'
import {App} from "./src/App.js";
import * as MinditorEditor from './src/editors/minditor'
import {EditorManager} from "./src/EditorManager.js";
import './icon.png'

const container = document.getElementById('root')!
const root = createRoot(container)

const editorManager = new EditorManager()
editorManager.install(MinditorEditor)


root.render(<App editorManager={editorManager}/>)
