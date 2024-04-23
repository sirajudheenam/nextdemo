import { useEffect, useState } from "react";

const Post = ({ post, onEdit, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedBody, setEditedBody] = useState(post.body);
    const [editedTag, setEditedTag] = useState(post.tag);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        // console.log(post._id, editedTitle, editedBody, editedTag);
        // Call onEdit function with updated post data
        onEdit(post._id, editedTitle, editedBody, editedTag);
        setEditing(false);
    };

    const handleDelete = () => {
        // Call onDelete function with post ID
        onDelete(post._id);
    };

    return (
        <div className="flex flex-col justify-between border p-4 my-4 rounded-md shadow-md">
            <div className="items-center mb-2">
                {editing ? (
                    <input
                        type="text"
                        className="border rounded-md p-2 w-full"
                        value={editedTitle}
                        placeholder="Post title"
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                ) : (
                    <h4 className="text-lg font-medium">{post.title}</h4>
                )}

                {editing ? (
                    <textarea
                        className="border rounded-md p-2 w-full text_area"
                        value={editedBody}
                        placeholder="Post body text"
                        onChange={(e) => setEditedBody(e.target.value)}
                    />
                ) : (
                    <p className="text-gray-700">{post.body}</p>
                )}
                {editing ? (
                    <input
                        className="border rounded-md p-2 w-full text_area"
                        value={editedTag}
                        placeholder="#Tags"
                        onChange={(e) => setEditedTag(e.target.value)}
                    />
                ) : (
                    <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mt-2">
                        {post.tag}
                    </span>
                )}

                <div className="flex-end">
                    {editing ? (
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Post;