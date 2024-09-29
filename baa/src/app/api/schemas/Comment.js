import mongoose, { Schema, model } from "mongoose";

const CommentSchema = new Schema(
	{
		content: {
			type: String,
			required: [true, "Content is required"],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.models?.Comment || model("Comment", CommentSchema);
export default Comment;
