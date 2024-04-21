"use client";

import { useState, useEffect, Suspense } from "react";

import PostCard from "./PostCard";

export const PostCardList = ({ data, handleTagClick }) => {
    return (
        data && (
            <div className='mt-16 prompt_layout'>
                {data.map((post) => (
                    <Suspense key={post._id}>
                        <PostCard
                            key={post._id}
                            post={post}
                            handleTagClick={handleTagClick}
                        />
                    </Suspense>
                ))}
            </div>)
    );
};

const FeedByUser = ({ id }) => {
    const [allPosts, setAllPosts] = useState([]);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async (id) => {
        const response = await fetch(`/api/users/${id}/posts`);
        const postData = await response.json();

        setAllPosts(postData);
    };
    useEffect(() => {
        if (id) fetchPosts(id);
    }, [id]);

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item?.author?.username) ||
                regex.test(item?.tag) ||
                regex.test(item?.title) ||
                regex.test(item?.body)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {/* All Prompts */}
            {searchText ? (
                <PostCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />

            ) : (
                <PostCardList data={allPosts} handleTagClick={handleTagClick} />
            )}
        </section >
    );
};

export default FeedByUser;