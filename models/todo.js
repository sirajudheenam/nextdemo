import { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema({
    executor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    completed: {
        type: Boolean,
    }
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;