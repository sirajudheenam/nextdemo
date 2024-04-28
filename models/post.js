import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    author: {
        type: String,
        required: [false, 'author is required.'],
    },
    title: {
        type: String,
        required: [true, 'Post Title is required.'],
    },
    body: {
        type: String,
        required: [true, 'Post Body is required.'],
    },
    tag: {
        type: String,
        required: [false, 'Tag is not required.'],
    },
    email: {
        type: String,
        required: [false, 'Email is required.'],
    }
});
// console.log('models.Post:', models.Post);
const Post = models.Post || model('Post', PostSchema);
// console.log("Post:", Post);
export default Post;