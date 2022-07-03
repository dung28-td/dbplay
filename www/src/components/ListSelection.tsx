import React, { useReducer, Fragment, useEffect, useRef } from 'react'
import List, { ListProps } from '@mui/material/List'
import { indexes } from 'utils/array'

type Action =
  | { type: 'only', index: number }
  | { type: 'single', index: number }
  | { type: 'multiple', index: number }
  | { type: 'reset', indexes: number[] }

const reducer = (state: number[], action: Action): number[] => {
  switch (action.type) {
    case 'only':
      return [action.index]
    case 'single':
      const index = state.indexOf(action.index)
      return index > -1
        ? state.filter((_, idx) => idx !== index)
        : [...state, action.index]
    case 'multiple':
      const min = Math.min(...state)
      const max = Math.max(...state)
      if (action.index > max) {
        return [...state, ...indexes(max + 1, action.index)]
      } else if (action.index < min) {
        return [...state, ...indexes(action.index, min -1)]
      } else {
        return reducer(state, { type: 'single', index: action.index })
      }
    case 'reset':
      return action.indexes
    default:
      return state
  }
}

export interface RenderItemProps<T> {
  item: T
  selected: boolean
  onSelect: (e: React.MouseEvent) => void
}

interface Props<T, LP = ListProps> {
  EmptyState?: React.ComponentType
  items?: T[]
  renderItem: (props: RenderItemProps<T>) => React.ReactNode,
  initializer?: (items: T[]) => number[]
  onChange?: (indexes: number[]) => void
  ListComponent?: React.ComponentType<LP>
  ListProps?: LP
}

export default function ListSelection<T, LP>({
  EmptyState = Fragment,
  items,
  renderItem,
  initializer = () => [],
  onChange,
  ListComponent = List,
  ListProps
}: Props<T, LP>) {
  const prevItemsRef = useRef(items)
  const [state, dispatch] = useReducer(reducer, items || [], initializer)

  useEffect(() => {
    if (!onChange) return
    onChange(state)
  }, [state, onChange])

  useEffect(() => {
    if (!items || prevItemsRef.current === items) return
    prevItemsRef.current = items

    dispatch({
      type: 'reset',
      indexes: initializer(items)
    })
  }, [items, initializer])

  return (
    // @ts-ignore
    <ListComponent {...ListProps}>
      {items?.length === 0 && <EmptyState />}
      {items?.map((item, index) => renderItem({
        item,
        selected: state.indexOf(index) > -1,
        onSelect: (e: React.MouseEvent) => {
          if (e.shiftKey || e.metaKey) {
            e.preventDefault()

            if (e.shiftKey) dispatch({ type: 'multiple', index })
            if (e.metaKey) dispatch({ type: 'single', index })
          } else {
            dispatch({ type: 'only', index })
          }
        }
      }))}
    </ListComponent>
  )
}