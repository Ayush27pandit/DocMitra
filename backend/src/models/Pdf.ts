import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  pdfUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pdfName: { type: String, required: true },
});

export const Pdf = mongoose.model("Pdf", pdfSchema);
