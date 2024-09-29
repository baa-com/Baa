'use client';

import { Box, Flex } from '@chakra-ui/react';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Central from '../components/Central';

export default function Home() {
  return (
    <Box height="100vh" bg="#E0EFFF">
      <Flex height="100vh">
        <LeftSidebar />

          <Central />

        <RightSidebar />
      </Flex>
    </Box>
  );
}
