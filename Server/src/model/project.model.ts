import mongoose, { Schema } from "mongoose";

interface ProjectStruct {
    title: string;
    description: string;
    owner: mongoose.Types.ObjectId;

    createdAt?: Date;
    updatedAt?: Date;
};

const projectSchema = new Schema<ProjectStruct>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project