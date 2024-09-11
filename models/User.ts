import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  clerk_id: string;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  clerk_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
