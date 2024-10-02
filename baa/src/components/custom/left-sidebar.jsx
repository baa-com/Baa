import NextImage from "next/image";
import { Box, VStack, Link, Text, Flex, Image } from "@chakra-ui/react";

export default function LeftSidebar() {
	return (
		<Box
			width="20%"
			bg="white"
			maxH="100vh"
			p={5}
			display="flex"
			flexDirection="column"
		>
			{/* Logo or Header */}
			<Flex mb={10} alignItems="center">
				<Image asChild mr="12px">
					<NextImage src="/sheep.png" alt="" width={96} height={96} />
				</Image>
			</Flex>

			{/* Navigation Links */}
			<VStack spacing={6} align="flex-start" flex="1">
				<Link href="#" _hover={{ textDecoration: "none" }}>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/house.svg" alt="" width={48} height={48} />
						</Image>
						<Text fontWeight="bold">Home</Text>
					</Flex>
				</Link>

				<Link href="#" _hover={{ textDecoration: "none" }}>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/compass.svg" alt="" width={48} height={48} />
						</Image>
						<Text>Explore</Text>
					</Flex>
				</Link>

				<Link href="#" _hover={{ textDecoration: "none" }}>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage
								src="/bookmark-simple.svg"
								alt=""
								width={48}
								height={48}
							/>
						</Image>
						<Text>Bookmarks</Text>
					</Flex>
				</Link>

				<Link href="#" _hover={{ textDecoration: "none" }}>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/person.svg" alt="" width={48} height={48} />
						</Image>
						<Text>Profile</Text>
					</Flex>
				</Link>

				<Link href="#" _hover={{ textDecoration: "none" }}>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/wrench.svg" alt="" width={48} height={48} />
						</Image>
						<Text>Preferences</Text>
					</Flex>
				</Link>

				{/* Create Button with Increased Width */}
				<Link
					href="#"
					_hover={{ textDecoration: "none" }}
					bg="gray.100"
					p={3}
					borderRadius="md"
					minW="150px"
				>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/plus.svg" alt="" width={48} height={48} />
						</Image>
						<Text>Create</Text>
					</Flex>
				</Link>
			</VStack>

			{/* Footer Link */}
			<Box mt="auto" pt={10}>
				<Link href="#" _hover={{ textDecoration: "none" }}>
					<Flex align="center">
						<Image asChild mr="12px">
							<NextImage src="/lifebuoy.svg" alt="" width={48} height={48} />
						</Image>
						<Text>Help</Text>
					</Flex>
				</Link>
			</Box>
		</Box>
	);
}
