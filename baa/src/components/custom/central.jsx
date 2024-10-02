import { Box, Tabs, VStack, Center } from "@chakra-ui/react";
import Post from "./post";

export default function Central() {
	return (
		<Box width={{ base: "100%", md: "60%" }} maxH="100vh" bg="white">
			<Tabs.Root
				variant="plain"
				fitted
				defaultValue={"for-you"}
				justify="center"
				size="lg"
				divideY="1px"
				divideColor="#EFEFEF"
			>
				<Tabs.List>
					<Tabs.Trigger
						value="for-you"
						_selected={{ fontWeight: "bold" }}
						p="5"
						fontSize="3xl"
					>
						For you
					</Tabs.Trigger>
					<Tabs.Trigger
						value="following"
						_selected={{ fontWeight: "bold" }}
						p="5"
						fontSize="3xl"
					>
						Following
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="for-you" overflow="scroll" maxH="90vh">
					<VStack divideY="1px" divideColor="#EFEFEF">
						{[1, 2, 3].map((index) => (
							<Center key={index} pt="25px">
								<Post caption={"Caption"} />
							</Center>
						))}
					</VStack>
				</Tabs.Content>
				<Tabs.Content value="following" overflow="scroll" maxH="90vh">
					<VStack divideY="1px" divideColor="#EFEFEF">
						{[1, 2, 3, 4, 5, 6].map((index) => (
							<Center key={index} pt="25px">
								<Post caption={"Caption"} />
							</Center>
						))}
					</VStack>
				</Tabs.Content>
			</Tabs.Root>
		</Box>
	);
}
