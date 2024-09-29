'use client';

import { Box, VStack, Heading, Flex, Text, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiUser, FiSearch } from 'react-icons/fi';

export default function RightSidebar() {
  return (
    <Box
      width="20%"
      bg="white"
      height="100vh"
      p={5}
      borderLeft="1px solid #E2E8F0"
    >
      {/* "Myself" Section */}
      <Flex mb={10} alignItems="center">
        <FiUser size={24} color="#40396E" style={{ marginRight: '12px' }} />
        <Text fontWeight="bold" color="#40396E">
          myself
        </Text>
      </Flex>

      {/* "Who to Follow" Section */}
      <Box mb={10}>
        <Heading as="h3" size="md" mb={4} color="#40396E" fontWeight="bold">
          Who to follow
        </Heading>
        <VStack spacing={4} align="flex-start">
          <Flex align="center">
            <FiUser size={24} color="#40396E" style={{ marginRight: '12px' }} />
            <Text fontWeight="bold" color="#40396E">username</Text>
          </Flex>
          <Flex align="center">
            <FiUser size={24} color="#40396E" style={{ marginRight: '12px' }} />
            <Text fontWeight="bold" color="#40396E">username</Text>
          </Flex>
          <Flex align="center">
            <FiUser size={24} color="#40396E" style={{ marginRight: '12px' }} />
            <Text fontWeight="bold" color="#40396E">username</Text>
          </Flex>
          <Flex align="center">
            <FiUser size={24} color="#40396E" style={{ marginRight: '12px' }} />
            <Text fontWeight="bold" color="#40396E">username</Text>
          </Flex>
        </VStack>
      </Box>

      {/* Search Bar */}
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="#40396E" />
        </InputLeftElement>
        <Input type="text" placeholder="Search" bg="gray.100" borderRadius="md" color="#40396E" fontWeight="bold" />
      </InputGroup>
    </Box>
  );
}
