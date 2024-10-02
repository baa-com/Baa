import { Dialog as ChakraDialog, Heading, Portal } from '@chakra-ui/react'
import { CloseButton } from './close-button'
import { forwardRef } from 'react'

export const DialogContent = forwardRef(function DialogContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    backdrop = true,
    ...rest
  } = props

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <ChakraDialog.Backdrop />}
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </Portal>
  )
})

export const DialogTrigger = (props) => {
  return <ChakraDialog.Trigger {...props} />
}

export const DialogCloseTrigger = forwardRef(
  function DialogCloseTrigger(props, ref) {
    return (
      <ChakraDialog.CloseTrigger
        position='absolute'
        top='2'
        insetEnd='2'
        {...props}
        asChild
      >
        <CloseButton size='sm' ref={ref}>
          {props.children}
        </CloseButton>
      </ChakraDialog.CloseTrigger>
    )
  },
)

export const DialogTitle = forwardRef(function DialogTitle(props, ref) {
  return (
    <ChakraDialog.Title {...props} asChild>
      <Heading as='h2' size='lg' lineHeight='1.2' ref={ref}>
        {props.children}
      </Heading>
    </ChakraDialog.Title>
  )
})

export const DialogDescription = forwardRef(
  function DialogDescription(props, ref) {
    return <ChakraDialog.Description color='fg.subtle' {...props} ref={ref} />
  },
)

export const DialogRoot = ChakraDialog.Root
export const DialogFooter = ChakraDialog.Footer
export const DialogHeader = ChakraDialog.Header
export const DialogBody = ChakraDialog.Body
export const DialogBackdrop = ChakraDialog.Backdrop
