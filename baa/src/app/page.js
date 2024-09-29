'use client';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import sheepImage from './sheep.png'; 
import Link from 'next/link';

export default function Home() {
  return (
    <Box height="100vh" bg="#E0EFFF" p={8}>
      <Flex justifyContent="flex-end" gap={10}>
      <Button as={Link} href="/home" variant="link" color="#40396E" fontSize="lg">
        Peek
      </Button>
      <Button bg="#40396E" color="white" borderRadius="full" fontSize="lg" width="auto" height="60px"  px={8} _hover={{ bg: "#2F2A55" }}>
        Join
      </Button>

      </Flex>

      <Flex height="calc(100vh - 80px)" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading as="h1" size="4xl" mb={4} color="#40396E">
            Baa
          </Heading>
          <Text fontSize="4xl" color="#9BA7C5" fontWeight="bold">
            Join our flock
          </Text>
        </Box>

        <Box>
          <Image
            src={sheepImage}
            alt="Sheep illustration"
            width={500}
            height={500}
            style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))' }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
