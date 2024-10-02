import {
  AbsoluteCenter,
  ProgressCircle as ChakraProgressCircle,
} from '@chakra-ui/react'

export const ProgressCircleRoot = ChakraProgressCircle.Root

export const ProgressCircleRing = (props) => {
  const { trackColor, cap, color, ...rest } = props
  return (
    <ChakraProgressCircle.Circle {...rest}>
      <ChakraProgressCircle.Track stroke={trackColor} />
      <ChakraProgressCircle.Range stroke={color} strokeLinecap={cap} />
    </ChakraProgressCircle.Circle>
  )
}

export const ProgressCircleValueText = (props) => {
  return (
    <AbsoluteCenter>
      <ChakraProgressCircle.ValueText {...props} />
    </AbsoluteCenter>
  )
}
