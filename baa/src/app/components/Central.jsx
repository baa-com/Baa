import {
	Box,
	Tabs,
	VStack,
	Flex,
	Text,
	Image,
	Container,
} from "@chakra-ui/react";
import heartSVG from "../public/heart-straight.svg";
import commentSVG from "../public/chat-circle.svg";
import voteSVG from "../public/chart-donut.svg";
import bookmarkSVG from "../public/bookmark-simple.svg";

export default function Central() {
	return (
		<Box
			width={{ base: "100%", md: "60%" }}
			height="100vh"
			p={5}
			bg="white"
			borderRight="1px solid #E2E8F0"
			borderLeft="1px solid #E2E8F0"
		>
			<Tabs.Root
				variant="line"
				fitted
				mb={5}
				defaultValue={"tab-1"}
				justify="center"
				size="lg"
			>
				<Tabs.List>
					<Tabs.Trigger
						value="tab-1"
						_selected={{ fontWeight: "bold", color: "purple.800" }}
						p="5"
					>
						For you
					</Tabs.Trigger>
					<Tabs.Trigger
						value="tab-2"
						_selected={{ fontWeight: "bold", color: "purple.800" }}
					>
						Following
					</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>

			<VStack spacing={8} align="stretch" overflowY="auto">
				{[1, 2, 3].map((index) => (
					<Box
						key={index}
						borderWidth="1px"
						borderRadius="md"
						p={4}
						bg="gray.100"
					>
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
								<Image src={heartSVG} alt={""} />
								<Image src={commentSVG} alt={""} />
								<Image src={voteSVG} alt={""} />
							</Flex>
							<Image src={bookmarkSVG} alt={""} />
						</Flex>
					</Box>
				))}
			</VStack>
		</Box>
	);
}
