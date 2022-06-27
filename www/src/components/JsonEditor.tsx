import { AceEditor, aceConfig } from "lib/ace"
import jsonMode from 'ace-builds/src-noconflict/mode-json'

aceConfig.setModuleUrl('ace/mode/json', jsonMode)

export default function JsonEditor() {
  return (
    <AceEditor
      mode='json'
    />
  )
}