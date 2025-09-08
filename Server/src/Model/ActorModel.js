import mongoose, { Schema } from "mongoose";

const actorSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: "" },
    availability: { type: Array, default: [] }
}, {
    timestamps: true
});

const Actor = mongoose.model("Actor", actorSchema);
export default Actor;