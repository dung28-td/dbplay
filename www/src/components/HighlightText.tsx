import { Fragment, useMemo } from "react"

interface MatchedText {
  text: string
  matched: boolean
}

const getTextMatches = (value: string, input: string): MatchedText[] => {
  const idx = value.indexOf(input)
  if (!input || idx < 0) return [
    {
      text: value,
      matched: false
    }
  ]

  const [prefix, current, suffix] = [
    value.substring(0, idx),
    value.substring(idx, idx + input.length),
    value.substring(idx + input.length)
  ]

  return [
    {
      text: prefix,
      matched: false
    },
    {
      text: current,
      matched: true
    },
    ...getTextMatches(suffix, input)
  ]
}

interface Props {
  value: string
  input: string
}

export default function HighlightText({ value, input }: Props) {
  const textMatches = useMemo(() => getTextMatches(value, input), [value, input])

  return (
    <Fragment>
      {textMatches.map(({ text, matched }, idx) => matched
        ? <b key={idx}>{text}</b>
        : <Fragment key={idx}>{text}</Fragment>
      )}
    </Fragment>
  )
}