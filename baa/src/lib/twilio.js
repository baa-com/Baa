import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function createEmailVerification(recipient) {
	const verification = await client.verify.v2
		.services("VAc5c419904492b765439bd239d7e05b5f")
		.verifications.create({
			channel: "email",
			channelConfiguration: {
				substitutions: {
					time:
						new Date().toLocaleString("en-US", {
							timeZone: "America/New_York",
						}) + " ET",
				},
			},
			to: recipient,
		});

	console.log(verification);
}

export async function createEmailVerificationCheck(code, recipient) {
	const verificationCheck = await client.verify.v2
		.services("VAc5c419904492b765439bd239d7e05b5f")
		.verificationChecks.create({
			code: code,
			to: recipient,
		});

	console.log(verificationCheck);
	return verificationCheck;
}
