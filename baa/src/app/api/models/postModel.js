import Post from "../schemas/Post";

export async function getAllPosts() {
	return await Post.find({}).exec();
}

export async function getPostById() {
	return await Post.find({ id }).exec();
}

export async function createPost(caption, firstImage, secondImage, authorId) {
	return await Post.create({
		caption,
		firstImage,
		secondImage,
		author: authorId,
	});
}
