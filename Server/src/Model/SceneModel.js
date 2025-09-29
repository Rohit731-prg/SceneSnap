import mongoose, { Schema } from "mongoose";

const sceneSchema = new Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor', required: true }],
    props: [{ type: Schema.Types.ObjectId, ref: 'Prop' }],
}, {
    timestamps: true,
});

const Scene = mongoose.model('Scene', sceneSchema);
export default Scene;