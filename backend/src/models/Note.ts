import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
    candidate: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    message: string;
    mentions: Schema.Types.ObjectId[];
}

const noteSchema = new Schema<INote>(
    {
        candidate: { type: Schema.Types.ObjectId, ref: "Candidate", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

export default mongoose.model<INote>("Note", noteSchema);
