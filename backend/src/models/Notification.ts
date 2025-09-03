import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
    userId: Schema.Types.ObjectId;
    candidateId: Schema.Types.ObjectId;
    noteId: Schema.Types.ObjectId;
    messagePreview: string;
    isRead: boolean;
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    candidateId: { type: Schema.Types.ObjectId, ref: "Candidate", required: true },
    noteId: { type: Schema.Types.ObjectId, ref: "Note", required: true },
    messagePreview: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<INotification>("Notification", notificationSchema);
