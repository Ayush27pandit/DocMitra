import mongoose from 'mongoose';

const rentAgreementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tenantName: { type: String, required: true },
  landlordName: { type: String, required: true },
  propertyAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  rentType: { type: String, enum: ["monthly", "yearly"], required: true },
  agreementCreatedAt: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  pdfId: { type: mongoose.Schema.Types.ObjectId, ref: "Pdf", required: true },
  docId: { type: String, required: true },
  rentAgreementStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
});

export const RentAgreementModel = mongoose.model("RentAgreement", rentAgreementSchema);
