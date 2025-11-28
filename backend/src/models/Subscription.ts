import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
  email: string;
  subscribedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please provide a valid email address',
    },
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Subscription = mongoose.model<ISubscription>(
  'Subscription',
  subscriptionSchema,
);
