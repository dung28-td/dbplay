import { forwardRef } from "react"
import { AceEditor, AceEditorProps, aceConfig } from "lib/ace"
import sqlMode from 'ace-builds/src-noconflict/mode-sql'
import { Ace } from "ace-builds"

aceConfig.setModuleUrl('ace/mode/sql', sqlMode)

interface Props extends AceEditorProps {
}

const SQLEditor = forwardRef<Ace.Editor, Props>((props, ref) => {
  return (
    <AceEditor
      ref={ref}
      mode='sql'
      {...props}
    />
  )
})

export default SQLEditor