import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const getDatabaseURL = () => {
    // if (process.env.NODE_ENV === 'development') {
    //     console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
    //     return {
    //         MONGODB_URI: process.env.DEV_MONGODB_URI,
    //         POSTGRES_URL: process.env.DEV_POSTGRES_URL
    //     };
    // } else if (process.env.NODE_ENV === 'production') {
    //     return {
    //         MONGODB_URI: process.env.MONGODB_URI,
    //         POSTGRES_URL: process.env.POSTGRES_URL
    //     };
    // } else {
    //     throw new Error('Environment not supported.');
    // }
    return {
        MONGODB_URI: process.env.MONGODB_URI,
        POSTGRES_URL: process.env.POSTGRES_URL
    };
};


export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    // const db = getDatabaseURL();
    // console.log('db:', db);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, /*   db.MONGODB_URI */ {
            dbName: process.env.MONGODB_NAME, /* db.MONGODB_NAME / "nextdemo" */
        });
        isConnected = true;
        console.log('MongoDB connected, current DB is:', process.env.MONGODB_NAME);
    } catch (error) {
        console.log(error);
    }
};