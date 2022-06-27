import { forwardRef, useLayoutEffect, useRef } from "react"
import Box from '@mui/material/Box'
import ace, { config, Ace } from "ace-builds"
import monokaiTheme from 'ace-builds/src-noconflict/theme-monokai'

export const aceConfig = config

aceConfig.setModuleUrl('ace/theme/monokai', monokaiTheme)

interface Props {
  value?: string
  mode?: string
  theme?: string
}

export const AceEditor = forwardRef<Ace.Editor, Props>(({
  value,
  mode,
  theme = 'monokai'
}, forwardedEditorRef) => {
  const ref = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Ace.Editor>()

  useLayoutEffect(() => {
    if (!ref.current) return

    editorRef.current = ace.edit(ref.current, {
      useWorker: false,
      mode: mode ? `ace/mode/${mode}` : undefined,
      theme: theme ? `ace/theme/${theme}` : undefined
    })

    if (typeof forwardedEditorRef === 'function') {
      forwardedEditorRef(editorRef.current)
    } else if (forwardedEditorRef?.current) {
      forwardedEditorRef.current = editorRef.current
    }
  }, [forwardedEditorRef, mode, theme])

  return <Box ref={ref} width={1} height={1}>{value}</Box>
})