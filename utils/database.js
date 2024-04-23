import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    // [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated 
    // option: useNewUrlParser has no effect since Node.js Driver 
    // version 4.0.0 and will be removed in the next major version

    // [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated 
    // option: useUnifiedTopology has no effect since Node.js 
    // Driver version 4.0.0 and will be removed in the next major version


    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // dbName: "nextdemo",
            dbName: process.env.MONGODB_NAME,
        });

        isConnected = true;

        console.log(`MongoDB connected, current DB is: ${process.env.MONGODB_NAME} `);
    } catch (error) {
        console.log(error);
    }
};