import {
	Box,
	VStack,
	Group,
	Heading,
	Flex,
	Text,
	Input,
	InputAddon,
} from "@chakra-ui/react";
import userSVG from "../public/user-circle.svg";
import searchSVG from "../public/magnifying-glass.svg";
import Image from "next/image";

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
				<Image src={userSVG} alt={""} style={{ marginRight: "12px" }} />
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
						<Image src={userSVG} alt={""} style={{ marginRight: "12px" }} />
						<Text fontWeight="bold" color="#40396E">
							username
						</Text>
					</Flex>
					<Flex align="center">
						<Image src={userSVG} alt={""} style={{ marginRight: "12px" }} />
						<Text fontWeight="bold" color="#40396E">
							username
						</Text>
					</Flex>
					<Flex align="center">
						<Image src={userSVG} alt={""} style={{ marginRight: "12px" }} />
						<Text fontWeight="bold" color="#40396E">
							username
						</Text>
					</Flex>
					<Flex align="center">
						<Image src={userSVG} alt={""} style={{ marginRight: "12px" }} />
						<Text fontWeight="bold" color="#40396E">
							username
						</Text>
					</Flex>
				</VStack>
			</Box>

			{/* Search Bar */}
			<Group attached>
				<InputAddon pointerEvents="none">
					<Image src={searchSVG} alt={""} style={{ marginRight: "12px" }} />
				</InputAddon>
				<Input
					type="text"
					placeholder="Search"
					bg="gray.100"
					borderRadius="md"
					color="#40396E"
					fontWeight="bold"
				/>
			</Group>
		</Box>
	);
}
