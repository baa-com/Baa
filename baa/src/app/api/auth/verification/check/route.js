import { createVerificationCheck } from "../../../../../lib/twilio";

export async function POST(request) {
	try {
		const { code, recipient } = await request.json();
		const verification = await createVerificationCheck(code, recipient);
		if (verification?.status === "approved") {
			return new Response(JSON.stringify({ success: true }), {
				status: 200,
			});
		} else {
			return new Response(JSON.stringify({ error: "Invalid code" }), {
				status: 400,
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
