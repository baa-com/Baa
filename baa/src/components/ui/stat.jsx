import {
  Badge,
  Stat as ChakraStat,
  FormatNumber,
  IconButton,
} from '@chakra-ui/react'
import { ToggleTip } from './toggle-tip'
import { HiOutlineInformationCircle } from 'react-icons/hi'

export const StatLabel = (props) => {
  const { info, children, ...rest } = props
  return (
    <ChakraStat.Label {...rest}>
      {children}
      {info && (
        <ToggleTip content={info}>
          <IconButton variant='ghost' aria-label='info' size='xs'>
            <HiOutlineInformationCircle />
          </IconButton>
        </ToggleTip>
      )}
    </ChakraStat.Label>
  )
}

export const StatValueText = (props) => {
  const { value, formatOptions, children, ...rest } = props
  return (
    <ChakraStat.ValueText {...rest}>
      {children ||
        (value != null && <FormatNumber value={value} {...formatOptions} />)}
    </ChakraStat.ValueText>
  )
}

export const StatUpTrend = (props) => {
  return (
    <Badge colorPalette='green' gap='0' {...props}>
      <ChakraStat.UpIndicator />
      {props.children}
    </Badge>
  )
}

export const StatDownTrend = (props) => {
  return (
    <Badge colorPalette='red' gap='0' {...props}>
      <ChakraStat.DownIndicator />
      {props.children}
    </Badge>
  )
}

export const StatRoot = ChakraStat.Root
export const StatHelpText = ChakraStat.HelpText
export const StatValueUnit = ChakraStat.ValueUnit
