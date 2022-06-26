import React, {
  Fragment,
  memo,
  useCallback,
  useLayoutEffect,
  useReducer
} from "react";

declare global {
  type WithModalProps<P> = P & {
    open: boolean
    onClose: () => void
  }
}

interface ModalProps<P = any> {
  Modal: React.ComponentType<WithModalProps<P>>,
  props: P
}

type Action =
  | { type: 'open', payload: ModalProps}
  | { type: 'close', index: number }

type OpenModalFunc = <P>(Modal: React.ComponentType<WithModalProps<P>>, props: P) => void
type CloseModalFunc = (index: number) => void

const defaultOpenModal: OpenModalFunc = (Modal, props) => {
  console.error("openModal hasn't been initialized yet!")
}
const defaultCloseModal: CloseModalFunc = (index) => {
  console.error("closeModal hasn't been initialized yet!")
}

export let openModal = defaultOpenModal
export let closeModal = defaultCloseModal

const ModalWrapper = memo(({ Modal, props, index }: ModalProps & { index: number }) => {
  const onClose = useCallback(() => closeModal(index), [index])

  return (
    <Modal
      open
      onClose={onClose}
      {...props}
    />
  )
})

const reducer = (state: ModalProps[], action: Action) => {
  switch (action.type) {
    case 'open':
      return [...state, action.payload]
    case 'close':
      return state.filter((_, idx) => action.index !== idx)
    default:
      return state
  }
}

export default function ModalsContainer() {
  const [modals, dispatch] = useReducer(reducer, [])

  useLayoutEffect(() => {
    openModal = (Modal, props) => dispatch({
      type: 'open',
      payload: { Modal, props }
    })
    closeModal = index => dispatch({
      type: 'close',
      index
    })

    return () => {
      openModal = defaultOpenModal
      closeModal = defaultCloseModal
    }
  }, [dispatch])

  return (
    <Fragment>
      {modals.map(({ Modal, props }, idx) => (
        <ModalWrapper
          key={idx}
          index={idx}
          Modal={Modal}
          props={props}
        />
      ))}
    </Fragment>
  )
}