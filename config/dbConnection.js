import mongoose from "mongoose";

const dbConnection = () => mongoose.connect(
    process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });

export default dbConnection;