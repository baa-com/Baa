import { createEmailVerification } from "../../../../../lib/twilio";

export async function POST(request) {
	try {
		const { recipient } = await request.json();
		await createEmailVerification(recipient);
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
