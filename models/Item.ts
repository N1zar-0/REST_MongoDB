import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
    text: string;
    checked: boolean;
}

const ItemSchema: Schema = new Schema({
    text: { type: String, required: true },
    checked: { type: Boolean, default: false },
});

const ItemModel = mongoose.model<IItem>("Item", ItemSchema);

export default ItemModel;