import { connectDB } from "../../lib/mongodb";
import { getPostById } from "../models/postModel";

export async function GET(request, { params }) {
	try {
		await connectDB;
		const { id } = params.id;
		const posts = await getPostById(id);
		return new Response(JSON.stringify(posts), { status: 200 });
	} catch (e) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
