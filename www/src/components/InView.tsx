import Box, { BoxProps } from '@mui/material/Box'
import useInView from 'hooks/useInView'
import useLatestRef from 'hooks/useLatestRef'
import { useLayoutEffect } from 'react'

interface Props extends Omit<BoxProps, 'onChange'> {
  options?: IntersectionObserverInit
  onChange: (inView: boolean) => void
}

export default function InView({ options, onChange, ...props }: Props) {
  const onChangeRef = useLatestRef(onChange)
  const { ref, inView } = useInView(options)

  useLayoutEffect(() => {
    if (!onChangeRef.current) return
    onChangeRef.current(inView)
  }, [inView, onChangeRef])

  return (
    <Box
      ref={ref}
      {...props}
    />
  )
}