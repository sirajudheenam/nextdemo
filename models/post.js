import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    }
});

const Post = models.Post || model('Post', PostSchema);

export default Post;