import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String, // hashed
    provider: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local',
    },
    providerId: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
