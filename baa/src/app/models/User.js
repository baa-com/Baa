import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Email is required"],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Email is invalid",
			],
		},
		username: {
			type: String,
			unique: true,
			required: [true, "Password is required"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		birthDate: {
			type: Date,
			required: [true, "Birth date is required"],
		},
		bio: {
			type: String,
		},
		followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
		following: [{ type: Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
		likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
		votes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models?.User || model("User", UserSchema);
export default User;
