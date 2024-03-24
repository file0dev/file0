import { createRoot, createElement } from 'axii'
import {App} from "./App.js";
import * as MinditorEditor from './editors/minditor.js'
import {EditorManager} from "./EditorManager.js";

const container = document.getElementById('root')!
const root = createRoot(container)

const editorManager = new EditorManager()
editorManager.install(MinditorEditor)


root.render(<App editorManager={editorManager}/>)
