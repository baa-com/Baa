import { Box, Flex } from "@chakra-ui/react";
import LeftSidebar from "../../components/custom/left-sidebar.jsx";
import RightSidebar from "../../components/custom/right-sidebar.jsx";
import Central from "../../components/custom/central.jsx";

export default function Home() {
	return (
		<Box maxH="100vh">
			<Flex height="100%" divideX="1px" divideColor="#EFEFEF">
				<LeftSidebar></LeftSidebar>

				<Central></Central>

				<RightSidebar></RightSidebar>
			</Flex>
		</Box>
	);
}
