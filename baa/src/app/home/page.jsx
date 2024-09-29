import { Box, Flex } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebar.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import Central from "../components/Central.jsx";

export default function Home() {
	return (
		<Box height="100vh" bg="#E0EFFF">
			<Flex height="100%">
				<LeftSidebar></LeftSidebar>

				<Central></Central>

				<RightSidebar></RightSidebar>
			</Flex>
		</Box>
	);
}
