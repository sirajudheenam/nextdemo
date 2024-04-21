import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    image: {
        type: String,
    }
});

// Check if model already exists, if not create one
// Since this is lambda function on Next.js we need
//  to check if model already exists
// lambda instace will be created on the fly and run it.

const User = models.User || model("User", UserSchema);

export default User;