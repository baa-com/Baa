import { connectDB } from "../../lib/mongodb";
import { getAllPosts, createPost } from "../models/postModel";

export async function GET(request) {
	try {
		await connectDB();
		const posts = await getAllPosts();
		return new Response(JSON.stringify(posts), { status: 200 });
	} catch (e) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}

export async function POST(request) {
	try {
		await connectDB();
		const { caption, firstImage, secondImage, authorId } = request.json();
		const post = await createPost(caption, firstImage, secondImage, authorId);
		return new Response(JSON.stringify(post), { status: 200 });
	} catch (e) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
