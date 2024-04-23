import { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema({
    // executor: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    executor: {
        type: String,
        required: [true, 'User Email is required!'],
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    completed: {
        type: Boolean,
    },
    userId: {
        type: String,
        required: [true, 'User ID is required!'],
    },
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;