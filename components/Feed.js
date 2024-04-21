"use client";

import { useState, useEffect, Suspense } from "react";

import PostCard from "./PostCard";

export const PostCardList = ({ data, handleTagClick }) => {
    // data && console.log("data: ", data);
    return (
        data && (
            <div className='mt-16 post_layout'>
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

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch("/api/post");
        const data = await response.json();

        setAllPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filterPosts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item?.author?.username) ||
                regex.test(item?.tag) ||
                regex.test(item?.title) ||
                regex.test(item?.post)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPosts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPosts(tagName);
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

            {/* All Posts */}
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

export default Feed;