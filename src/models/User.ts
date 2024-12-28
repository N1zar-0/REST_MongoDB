import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    login: string;
    pass: string;
}

const UserSchema: Schema = new Schema({
    login: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;