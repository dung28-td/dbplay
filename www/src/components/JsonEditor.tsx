import { AceEditor, AceEditorProps, aceConfig } from "lib/ace"
import jsonMode from 'ace-builds/src-noconflict/mode-json'
import { forwardRef, useCallback } from "react"
import { Ace } from "ace-builds"
import { getErrorMessage } from "utils/error"

aceConfig.setModuleUrl('ace/mode/json', jsonMode)

interface Props extends Omit<AceEditorProps, 'value' | 'onChange'> {
  value?: JSON
  onChange?: (newValue: JSON) => void
  onError?: (error: string | undefined)=> void
}

const JsonEditor = forwardRef<Ace.Editor, Props>(({ value, onChange, onError, ...rest }, ref) => {
  const handleChange = useCallback((session: Ace.EditSession) => {
    if (!onChange) return

    let err = undefined

    try {
      onChange(JSON.parse(session.getValue()))
    } catch (error) {
      err = getErrorMessage(error)
    }

    if (onError) onError(err)
  }, [onChange, onError])

  return (
    <AceEditor
      ref={ref}
      mode='json'
      value={JSON.stringify(value, null, '\t')}
      onChange={handleChange}
      {...rest}
    />
  )
})

export default JsonEditor