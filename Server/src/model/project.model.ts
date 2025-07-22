import mongoose, { Schema, Document, Model } from "mongoose";
import Scene from "./scene.model";

interface ProjectDocument extends Document {
  title: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

projectSchema.pre('findOneAndDelete', async function (next) {
  const projectId = this.getQuery()._id;
  if (projectId) {
    await Scene.deleteMany({ project: projectId });
  }
  next();
});


const Project: Model<ProjectDocument> = mongoose.model<ProjectDocument>('Project', projectSchema);
export default Project;