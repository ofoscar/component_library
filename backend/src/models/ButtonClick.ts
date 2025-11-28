import mongoose, { Document, Schema } from 'mongoose';

export interface IButtonClick extends Document {
  buttonId: string;
  buttonText: string;
  userId?: string;
  sessionId: string;
  timestamp: Date;
  metadata: {
    variant?: string;
    size?: string;
    page: string;
    userAgent: string;
  };
}

const buttonClickSchema = new Schema<IButtonClick>({
  buttonId: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  sessionId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    variant: String,
    size: String,
    page: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
});

// Index for performance
buttonClickSchema.index({ timestamp: -1 });
buttonClickSchema.index({ buttonId: 1, timestamp: -1 });

export const ButtonClick = mongoose.model<IButtonClick>(
  'ButtonClick',
  buttonClickSchema,
);
