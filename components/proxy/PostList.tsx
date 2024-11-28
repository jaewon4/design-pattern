import { useState, useEffect } from "react";
import { Post, ProxyDataService } from "@/lib/patterns/proxy";

const dataService = new ProxyDataService();

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await dataService.getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPost = async (id: number) => {
    setLoading(true);
    try {
      const post = await dataService.getPost(id);
      setSelectedPost(post);
    } catch (error) {
      console.error("Failed to load post:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    dataService.clearCache();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={loadPosts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          새로고침
        </button>
        <button
          onClick={clearCache}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          캐시 초기화
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="cursor-pointer p-4 border rounded hover:bg-gray-50"
              onClick={() => loadPost(post.id)}
            >
              <h3 className="font-medium">{post.title}</h3>
            </div>
          ))}
        </div>

        {selectedPost && (
          <div className="p-4 border rounded bg-white">
            <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
          </div>
        )}
      </div>
    </div>
  );
};
