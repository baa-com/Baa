import { DataList as ChakraDataList, IconButton } from '@chakra-ui/react'
import { ToggleTip } from './toggle-tip'
import { forwardRef } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'

export const DataListRoot = ChakraDataList.Root

export const DataListItem = forwardRef(function DataListItem(props, ref) {
  const { label, info, value, children, ...rest } = props
  return (
    <ChakraDataList.Item ref={ref} {...rest}>
      <ChakraDataList.ItemLabel>
        {label}
        {info && (
          <ToggleTip content={info}>
            <IconButton variant='ghost' aria-label='info' size='xs'>
              <HiOutlineInformationCircle />
            </IconButton>
          </ToggleTip>
        )}
      </ChakraDataList.ItemLabel>
      <ChakraDataList.ItemValue>{value}</ChakraDataList.ItemValue>
      {children}
    </ChakraDataList.Item>
  )
})
