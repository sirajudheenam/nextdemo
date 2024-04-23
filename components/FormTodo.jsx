import Link from "next/link";

const FormTodo = ({ type, todo, setTodo, submitting, isCompleted, setIsCompleted, handleSubmit }) => {

    console.log('todo:', todo);
    console.log("type", type);
    console.log('isCompleted:', isCompleted);
    console.log('submitting:', submitting);

    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Todo</span>
            </h1>
            <p className='desc text-left max-w-md'>
                {type === 'Create' ? 'Create' : 'Update'} Todo Item
            </p>

            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Your Todo Item
                    </span>

                    <input
                        value={todo?.title}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                        placeholder='Write your ToDo Item'
                        required
                        className='form_input'
                    />
                    <input
                        type="checkbox"
                        // value={todo.completed}
                        // onChange={(e) => setTodo({ ...todo, completed: e.target.value })}
                        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                        checked={todo?.completed}

                        className='form_checkbox'
                    />

                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href='/todos' className='text-gray-500 text-sm'>
                        Cancel
                    </Link>

                    <button
                        type='submit'
                        disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                    >
                        {submitting ? (type === 'Create' ? `Creating...` : `Updating...`) : (type === 'Edit' ? `Update` : `${type}`)}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default FormTodo;