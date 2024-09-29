'use client';

import { Box, Tab, TabList, Tabs, VStack, Flex, Icon, Text, Image } from '@chakra-ui/react';
import { FiHeart, FiMessageCircle, FiRefreshCw, FiBookmark } from 'react-icons/fi';

export default function Central() {
  return (
    <Box
      width={{ base: '100%', md: '60%' }}
      height="100vh"
      overflowY="auto"
      p={5}
      bg="white"
      borderRight="1px solid #E2E8F0"
      borderLeft="1px solid #E2E8F0"
    >
      <Tabs variant="enclosed" mb={5}>
        <TabList>
          <Tab _selected={{ fontWeight: 'bold', color: 'purple.800' }}>For you</Tab>
          <Tab _selected={{ fontWeight: 'bold', color: 'purple.800' }}>Following</Tab>
        </TabList>
      </Tabs>

      <VStack spacing={8} align="stretch">
        {[1, 2, 3].map((index) => (
          <Box key={index} borderWidth="1px" borderRadius="md" p={4} bg="gray.100">
            <VStack spacing={2}>
              <Image
                width="540px"
                height="256px"
                backgroundColor="gray.300"
                alt="Placeholder"
                objectFit="cover"
              />
              <Image
                width="540px"
                height="256px"
                backgroundColor="gray.300"
                alt="Placeholder"
                objectFit="cover"
              />
            </VStack>
            <Text fontWeight="bold" mt={4}>
              Caption
            </Text>

            <Flex mt={4} justifyContent="space-between">
              <Flex gap={4}>
                <Icon as={FiHeart} boxSize={6} />
                <Icon as={FiMessageCircle} boxSize={6} />
                <Icon as={FiRefreshCw} boxSize={6} />
              </Flex>
              <Icon as={FiBookmark} boxSize={6} />
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
