import mongoose, { Schema } from "mongoose";

interface UserStruct {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    auth: boolean;
    otp: string;
    image: string;
    public_key: string;
    verified: boolean;

    createdAt?: Date;
    updatedAt?: Date;
};

const userSchema = new Schema<UserStruct>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    auth: { type: Boolean, default: false },
    otp: { type: String, default: '' },
    image: { type: String, default: '' },
    public_key: { type: String, default: '' },
    verified: { type: Boolean, default: false },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User