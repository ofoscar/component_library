import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/components_library';

    console.log('Attempting to connect to MongoDB...');
    console.log(
      'MongoDB URI:',
      mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'),
    ); // Hide credentials in logs

    if (!process.env.MONGODB_URI) {
      console.warn(
        'Warning: MONGODB_URI environment variable not set. Using localhost fallback.',
      );
    }

    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error(
      'Make sure MONGODB_URI environment variable is set with a valid MongoDB connection string',
    );
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Handle app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

export default connectDB;
