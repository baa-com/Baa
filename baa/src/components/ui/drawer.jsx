import { Drawer as ChakraDrawer, Heading, Portal } from '@chakra-ui/react'
import { CloseButton } from './close-button'
import { forwardRef } from 'react'

export const DrawerContent = forwardRef(function DrawerContent(props, ref) {
  const { children, portalled = true, portalRef, offset, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraDrawer.Positioner padding={offset}>
        <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawer.Content>
      </ChakraDrawer.Positioner>
    </Portal>
  )
})

export const DrawerCloseTrigger = forwardRef(
  function DrawerCloseTrigger(props, ref) {
    return (
      <ChakraDrawer.CloseTrigger
        position='absolute'
        top='2'
        insetEnd='2'
        {...props}
        asChild
      >
        <CloseButton size='sm' ref={ref} />
      </ChakraDrawer.CloseTrigger>
    )
  },
)

export const DrawerTitle = forwardRef(function DrawerTitle(props, ref) {
  return (
    <ChakraDrawer.Title {...props} asChild>
      <Heading as='h2' size='lg' lineHeight='1.2' ref={ref}>
        {props.children}
      </Heading>
    </ChakraDrawer.Title>
  )
})

export const DrawerDescription = forwardRef(
  function DrawerDescription(props, ref) {
    return <ChakraDrawer.Description color='fg.muted' ref={ref} {...props} />
  },
)

export const DrawerTrigger = ChakraDrawer.Trigger
export const DrawerRoot = ChakraDrawer.Root
export const DrawerFooter = ChakraDrawer.Footer
export const DrawerHeader = ChakraDrawer.Header
export const DrawerBody = ChakraDrawer.Body
export const DrawerBackdrop = ChakraDrawer.Backdrop
