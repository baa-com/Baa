'use client';

import { Box, VStack, Image, Link, Text, Flex } from '@chakra-ui/react';
import { FiHome, FiCompass, FiBookmark, FiUser, FiSettings, FiPlus, FiHelpCircle } from 'react-icons/fi';
import sheepImage from '@/app/sheep.png';

export default function LeftSidebar() {
  return (
    <Box
      width="20%"
      bg="white"
      height="100vh"
      p={5}
      borderRight="1px solid #E2E8F0"
      display="flex"
      flexDirection="column"
    >
      {/* Logo or Header */}
      <Flex mb={10} alignItems="center">
        <Image src={sheepImage} alt="Sheep logo" boxSize="40px" mr={4} />
      </Flex>

      {/* Navigation Links */}
      <VStack spacing={6} align="flex-start" flex="1">
        <Link href="#" _hover={{ textDecoration: 'none' }} color="#40396E">
          <Flex align="center">
            <FiHome size={24} style={{ marginRight: '12px' }} />
            <Text fontWeight="bold" color="#40396E">Home</Text>
          </Flex>
        </Link>

        <Link href="#" _hover={{ textDecoration: 'none' }} color="#40396E">
          <Flex align="center">
            <FiCompass size={24} style={{ marginRight: '12px' }} />
            <Text color="#40396E">Explore</Text>
          </Flex>
        </Link>

        <Link href="#" _hover={{ textDecoration: 'none' }} color="#40396E">
          <Flex align="center">
            <FiBookmark size={24} style={{ marginRight: '12px' }} />
            <Text color="#40396E">Bookmarks</Text>
          </Flex>
        </Link>

        <Link href="#" _hover={{ textDecoration: 'none' }} color="#40396E">
          <Flex align="center">
            <FiUser size={24} style={{ marginRight: '12px' }} />
            <Text color="#40396E">Profile</Text>
          </Flex>
        </Link>

        <Link href="#" _hover={{ textDecoration: 'none' }} color="#40396E">
          <Flex align="center">
            <FiSettings size={24} style={{ marginRight: '12px' }} />
            <Text color="#40396E">Preferences</Text>
          </Flex>
        </Link>

        {/* Create Button with Increased Width */}
        <Link href="#" _hover={{ textDecoration: 'none' }} bg="gray.100" p={3} borderRadius="md" color="#40396E" minW="150px">
          <Flex align="center">
            <FiPlus size={24} style={{ marginRight: '12px' }} />
            <Text color="#40396E">Create</Text>
          </Flex>
        </Link>
      </VStack>

      {/* Footer Link */}
      <Box mt="auto" pt={10}>
        <Link href="#" _hover={{ textDecoration: 'none' }} color="#40396E">
          <Flex align="center">
            <FiHelpCircle size={24} style={{ marginRight: '12px' }} />
            <Text color="#40396E">Help</Text>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
}
