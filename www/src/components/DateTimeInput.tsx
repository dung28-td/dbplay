import React, { forwardRef, useCallback, useMemo } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import dayjs from "dayjs";

type Props = Omit<TextFieldProps, 'value' | 'onChange'> & {
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: Date) => void
}

const DateTimeInput = forwardRef<HTMLDivElement, Props>(({ value, onChange, ...props }, ref) => {
  const localValue = useMemo(() => (
    value
      ? dayjs(value).format('YYYY-MM-DDTHH:mm')
      : value === undefined
        ? undefined
        : value
  ), [value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e, new Date(e.currentTarget.value))
  }, [onChange])

  return (
    <TextField
      ref={ref}
      type='datetime-local'
      value={localValue}
      onChange={handleChange}
      {...props}
    />
  )
})

export default DateTimeInput