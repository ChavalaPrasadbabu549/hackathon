import mongoose, { Schema, Document } from "mongoose";

export interface ICandidate extends Document {
    name: string;
    email: string;
    createdBy: Schema.Types.ObjectId;
}

const candidateSchema = new Schema<ICandidate>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICandidate>("Candidate", candidateSchema);
