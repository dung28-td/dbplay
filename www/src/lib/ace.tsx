import { forwardRef, useEffect, useLayoutEffect, useRef } from "react"
import Box from '@mui/material/Box'
import ace, { config, Ace } from "ace-builds"
// theme
import monokaiTheme from 'ace-builds/src-noconflict/theme-monokai'
// extensions
import 'ace-builds/src-noconflict/ext-searchbox'

export const aceConfig = config

aceConfig.setModuleUrl('ace/theme/monokai', monokaiTheme)

export interface AceEditorProps {
  value?: string
  mode?: string
  theme?: string
  onSave?: (editor: Ace.Editor, args?: any) => void
  onChange?: (session: Ace.EditSession) => void
}

export const AceEditor = forwardRef<Ace.Editor, AceEditorProps>(({
  value,
  mode,
  onSave,
  onChange,
  theme = 'monokai'
}, forwardedEditorRef) => {
  const ref = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Ace.Editor>()

  useLayoutEffect(() => {
    if (!ref.current || !!editorRef.current) return

    editorRef.current = ace.edit(ref.current, {
      value,
      useWorker: false,
      mode: mode ? `ace/mode/${mode}` : undefined,
      theme: theme ? `ace/theme/${theme}` : undefined,
      wrap: 'free'
    })

    if (typeof forwardedEditorRef === 'function') {
      forwardedEditorRef(editorRef.current)
    } else if (forwardedEditorRef?.current) {
      forwardedEditorRef.current = editorRef.current
    }
  }, [forwardedEditorRef, mode, theme, value])

  useEffect(() => {
    if (!onSave) return

    editorRef.current?.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S',  mac: 'Command-S' },
      exec: onSave
    })

    return () => editorRef.current?.commands.removeCommand('save')
  }, [onSave])

  useEffect(() => {
    if (!onChange || !editorRef.current) return

    const hdr = () => onChange(editorRef.current!.session)
    editorRef.current.session.on('change', hdr)
    return () => editorRef.current?.session.off('change', hdr)
  }, [onChange])

  return <Box ref={ref} width={1} height={1} />
})