import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await appwriteService.getAllPosts();
        if (postsData && postsData.documents) {
          setPosts(postsData.documents);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error loading posts. Please try again later.</p>
        ) : posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard
                  slug={post.$id}
                  featuredImage={post.featuredImage}
                  title={post.title}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
