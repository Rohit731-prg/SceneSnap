import mongoose, { Schema, Document, Model } from "mongoose";

interface IActor extends Document {
  name: string;
  role: string;
  availability: string[];
  image: string;
  public_id: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const actorSchema = new Schema<IActor>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    availability: { type: [String], required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Actor: Model<IActor> = mongoose.model<IActor>("Actor", actorSchema);
export default Actor;
