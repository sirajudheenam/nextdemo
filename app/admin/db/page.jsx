import mongoose, { Schema, model, models } from 'mongoose';

function page(req) {

    const params = req.params; // /app/admin/db/[id]/
    const searchParams = req.searchParams; // // /app/admin/db/[id]/?name=Sam&age=20
    console.log('params', params);
    console.log('searchParams', searchParams);

    const sampleBlogPosts = [
        {
            title: '1. This is my blog post ', // String is shorthand for {type: String}
            author: "Sam",
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc.  ',
            comments: [{ body: 'Pleasant to read', date: Date.now }, { body: 'Nice text', date: Date.now }],
            date: { type: Date, default: Date.now },
            hidden: false,
            meta: {
                votes: 200,
                favs: 540
            }
        },
        {
            title: '2. This is my blog post ',
            author: "Femida",
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. ',
            comments: [{ body: 'HEllo Sweet 6', date: Date.now }, { body: 'Great Article', date: Date.now }],
            date: { type: Date, default: Date.now },
            hidden: false,
            meta: {
                votes: 200,
                favs: 540
            }
        }];

    const generateRandomTodos = (n) => {
        const todos = [];
        Array.from(Array(n).keys()).forEach((i) => {
            todos.push({
                title: `Todo ${i}`,
                completed: true,
                email: `email_${i}@example.com`
            });
        });
        console.log("todos generated : ", todos);
        return todos;
    };

    const createdTodos = generateRandomTodos(5);

    let isConnected = false;

    // Connect to DB
    const connectToDB = async (mongodbUri, mongodbName) => {
        mongoose.set('strictQuery', true);

        if (isConnected) {
            console.log('MongoDB is already connected');
            return;
        }
        try {
            await mongoose.connect(mongodbUri, {
                dbName: mongodbName,
            });
            isConnected = true;
            console.log(`MongoDB connected, current DB is: ${mongodbName}`);
        } catch (error) {
            console.log(error);
        }
    };

    // Create Schema
    const TodoSchema = new Schema({
        email: {
            type: String,
            required: [true, 'User Email is required!'],
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

    const blogSchema = new Schema({
        title: String, // String is shorthand for {type: String}
        author: String,
        body: String,
        comments: [{ body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
            votes: Number,
            favs: Number
        }
    });

    const Blog = models.Blog || model("Blog", blogSchema);

    return (
        <div>
            <h1>/app/admin/db/page.jsx</h1>
        </div>
    );
}

export default page;