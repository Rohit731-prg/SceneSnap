import mongoose, { Schema } from "mongoose";

interface PropsStruct {
    name: string,
    description: string,
    image: string,
    public_id: string,
    isAvailable: boolean,

    createdAt?: Date,
    updatedAt?: Date
};

const propsSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    public_id: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
}, {
    timestamps: true
});

const Props = mongoose.model('Props', propsSchema);
export default Props