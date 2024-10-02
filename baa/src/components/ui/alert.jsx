import { Alert as ChakraAlert, Stack } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Alert = forwardRef(function Alert(props, ref) {
  const { title, children, icon, ...rest } = props
  return (
    <ChakraAlert.Root ref={ref} {...rest}>
      <ChakraAlert.Indicator>{icon}</ChakraAlert.Indicator>
      {children ? (
        <Stack gap='1'>
          <ChakraAlert.Title>{title}</ChakraAlert.Title>
          <ChakraAlert.Description>{children}</ChakraAlert.Description>
        </Stack>
      ) : (
        <ChakraAlert.Title>{title}</ChakraAlert.Title>
      )}
    </ChakraAlert.Root>
  )
})
