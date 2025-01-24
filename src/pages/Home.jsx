import React, { useEffect, useState } from "react";
import appWriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appWriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        console.log("Hello document", posts);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (posts.length > 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard
                  slug={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
