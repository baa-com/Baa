import { HStack, Text, Image, VStack } from "@chakra-ui/react";
import NextImage from "next/image";
import LikeIcon from "../icons/like";
import CommentIcon from "../icons/comment";
import VoteIcon from "../icons/vote";
import BookmarkIcon from "../icons/bookmark";

export default function Post({ caption }) {
	return (
		<VStack w="540px" p="0" gap="5px" align="start">
			<VStack
				w="100%"
				h="512px"
				divideY="1px"
				divideColor="#CFD9DE"
				divideStyle="solid"
				outline="1px solid #CFD9DE"
				borderRadius="2xl"
			>
				<Image asChild>
					<NextImage
						src="https://placehold.co/540x256/white/black.svg"
						alt="Placeholder image"
						width={540}
						height={256}
					/>
				</Image>
				<Image asChild>
					<NextImage
						src="https://placehold.co/540x256/white/black.svg"
						alt="Placeholder image"
						width={540}
						height={256}
					/>
				</Image>
			</VStack>
			<Text fontSize="2xl">{caption}</Text>
			<HStack w="100%" justify="space-between">
				<HStack>
					<LikeIcon boxSize="36px" color="black" />
					<CommentIcon boxSize="36px" color="black" />
					<VoteIcon boxSize="36px" color="black" />
				</HStack>
				<Image asChild>
					<BookmarkIcon boxSize="36px" color="black" />
				</Image>
			</HStack>
		</VStack>
	);
}
