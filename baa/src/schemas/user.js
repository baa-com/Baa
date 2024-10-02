import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: [true, "Full name is required"],
		},
		email: {
			type: String,
			default: "",
		},
		phoneNumber: {
			type: String,
			default: "",
		},
		username: {
			type: String,
			unique: true,
			required: [true, "Username is required"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		birthday: {
			type: Date,
			required: [true, "Birthday is required"],
		},
		bio: {
			type: String,
			default: "",
		},
		verified: { type: Boolean, default: true },
		banned: { type: Boolean, default: false },
		followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
		following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
		posts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
		likes: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
		votes: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
	},
	{
		timestamps: true,
	},
	{
		autoIndex: true,
	}
);

const User = mongoose.models?.User || model("User", UserSchema);
export default User;
