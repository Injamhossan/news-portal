import mongoose, { Schema, Document, Model } from "mongoose";

export interface INews extends Document {
  title: string;
  category: string;
  categoryColor?: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  createdAt: Date;
  isBreaking: boolean;
}

const NewsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    categoryColor: { type: String, default: "bg-blue-500" },
    excerpt: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, default: "https://placehold.co/600x400/png" },
    isBreaking: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Prevent overwriting model if it already exists
const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>("News", NewsSchema);

export default News;
