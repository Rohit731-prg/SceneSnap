import mongoose, { Schema } from "mongoose";

interface IScene {
    title: string;
    location: string;
    status: string;
    project: mongoose.Types.ObjectId;
    actors: mongoose.Types.ObjectId[];
    props: mongoose.Types.ObjectId[];

}

const sceneSchema = new Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    actors: { type: [Schema.Types.ObjectId], ref: 'Actor', required: true },
    props: { type: [Schema.Types.ObjectId], ref: 'Props', required: true },
}, {
    timestamps: true
});

const Scene = mongoose.model('Scene', sceneSchema);
export default Scene;