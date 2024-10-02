import {
	Box,
	VStack,
	Group,
	Heading,
	Flex,
	Text,
	Input,
	InputAddon,
	Image,
} from "@chakra-ui/react";
import NextImage from "next/image";

export default function RightSidebar() {
	return (
		<Box width="20%" bg="white" maxH="100vh" p={5}>
			{/* "Myself" Section */}
			<Flex mb={10} alignItems="center">
				<Image asChild mr="12px">
					<NextImage src="/user-circle.svg" alt="" width={48} height={48} />
				</Image>
				<Text fontWeight="bold">myself</Text>
			</Flex>

			{/* "Who to Follow" Section */}
			<Box mb={10}>
				<Heading as="h3" size="md" mb={4} fontWeight="bold">
					Who to follow
				</Heading>
				<VStack spacing={4} align="flex-start">
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/user-circle.svg" alt="" width={48} height={48} />
						</Image>
						<Text fontWeight="bold">username</Text>
					</Flex>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/user-circle.svg" alt="" width={48} height={48} />
						</Image>
						<Text fontWeight="bold">username</Text>
					</Flex>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/user-circle.svg" alt="" width={48} height={48} />
						</Image>
						<Text fontWeight="bold">username</Text>
					</Flex>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/user-circle.svg" alt="" width={48} height={48} />
						</Image>
						<Text fontWeight="bold">username</Text>
					</Flex>
				</VStack>
			</Box>

			{/* Search Bar */}
			<Group attached>
				<InputAddon pointerEvents="none">
					<Image asChild mr="12px">
						<NextImage
							src="/magnifying-glass.svg"
							alt=""
							width={48}
							height={48}
						/>
					</Image>
				</InputAddon>
				<Input
					type="text"
					placeholder="Search"
					bg="gray.100"
					borderRadius="md"
					fontWeight="bold"
				/>
			</Group>
		</Box>
	);
}
