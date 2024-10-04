import { createVerification } from "../../../../../lib/twilio";

export async function POST(request) {
	try {
		const { channel, recipient } = await request.json();
		await createVerification(channel, recipient);
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
