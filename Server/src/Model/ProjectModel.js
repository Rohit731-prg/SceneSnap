import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;