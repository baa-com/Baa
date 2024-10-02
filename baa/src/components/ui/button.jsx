import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from '@chakra-ui/react'

import { forwardRef } from 'react'

export const Button = forwardRef(function Button(props, ref) {
  const { loading, disabled, loadingText, children, ...rest } = props

  const trulyDisabled = loading || disabled
  const showSpinner = loading && !loadingText

  return (
    <ChakraButton disabled={trulyDisabled} ref={ref} {...rest}>
      {showSpinner && <ButtonSpinner />}
      {loading ? loadingText || <Span opacity={0}>{children}</Span> : children}
    </ChakraButton>
  )
})

const ButtonSpinner = () => (
  <AbsoluteCenter display='inline-flex'>
    <Spinner boxSize='1em' color='currentColor' />
  </AbsoluteCenter>
)
