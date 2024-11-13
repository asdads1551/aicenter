import mongoose, { Schema, Document } from 'mongoose';

export interface AIcardInterface extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string[];
  imageUrl: string;
  websiteUrl: string;
  monthlyVisits: number;
  saveCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const AIcardSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  monthlyVisits: { type: Number, default: 0 },
  saveCount: { type: Number, default: 0 },
}, { timestamps: true });

export const AIcard = mongoose.models.AIcard || mongoose.model<AIcardInterface>('AIcard', AIcardSchema);