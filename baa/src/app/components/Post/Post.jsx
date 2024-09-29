import { Box, Container, HStack, Text } from "@chakra-ui/react";
import heartSVG from "../../public/heart-straight.svg";
import commentSVG from "../../public/chat-circle.svg";
import voteSVG from "../../public/chart-donut.svg";
import bookmarkSVG from "../../public/bookmark-simple.svg";
import Image from "next/image";

export default function Post({ caption }) {
	return (
		<Container w="540px" p="0">
			<Container w="100%" h="512px" p="0" mb="10px" bg="blue.600" color="white">
				<Image
					src="https://via.placeholder.com/540x256"
					alt="Placeholder image"
					width={540}
					height={256}
				/>
				<Image
					src="https://via.placeholder.com/540x256"
					alt="Placeholder image"
					width={540}
					height={256}
				/>
			</Container>
			<Text fontSize="3xl">{caption}</Text>
			<HStack justify="space-between">
				<HStack>
					<Image src={heartSVG} alt={""} />
					<Image src={commentSVG} alt={""} />
					<Image src={voteSVG} alt={""} />
				</HStack>
				<Image src={bookmarkSVG} alt={""} />
			</HStack>
		</Container>
	);
}
