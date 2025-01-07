import { createContext, useState, useContext, useEffect } from 'react';

const PostContext = createContext();

const STORAGE_KEY = 'blog_posts';

// Helper functions for localStorage operations
const storage = {
  save: (key, data) => {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      console.log('Saved to localStorage:', { key, data }); // Debug log
      return true;
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      return false;
    }
  },
  load: (key) => {
    try {
      const serialized = localStorage.getItem(key);
      console.log('Loaded from localStorage:', { key, data: serialized }); // Debug log
      return serialized ? JSON.parse(serialized) : null;
    } catch (err) {
      console.error('Error loading from localStorage:', err);
      return null;
    }
  }
};

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load posts from localStorage on mount
  useEffect(() => {
    const loadPosts = () => {
      setLoading(true);
      try {
        const savedPosts = storage.load(STORAGE_KEY);
        console.log('Initial load from localStorage:', savedPosts); // Debug log
        if (savedPosts) {
          setPosts(savedPosts);
        }
      } catch (err) {
        console.error('Error in initial load:', err);
        setError('Failed to load saved posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (!loading) { // Only save if not in initial loading state
      console.log('Saving posts to localStorage:', posts); // Debug log
      if (!storage.save(STORAGE_KEY, posts)) {
        setError('Failed to save posts');
      }
    }
  }, [posts, loading]);

  const addPost = async (post) => {
    try {
      setLoading(true);
      const newPost = { ...post, id: Date.now().toString() };
      setPosts(prevPosts => {
        const updatedPosts = [...prevPosts, newPost];
        console.log('Adding post, new state:', updatedPosts); // Debug log
        return updatedPosts;
      });
      setError(null);
      return newPost;
    } catch (err) {
      setError('Failed to add post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      setLoading(true);
      setPosts(prevPosts => {
        const newPosts = prevPosts.map(post => 
          post.id === id ? { ...post, ...updatedPost } : post
        );
        console.log('Updating post, new state:', newPosts); // Debug log
        return newPosts;
      });
      setError(null);
    } catch (err) {
      setError('Failed to update post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setLoading(true);
      setPosts(prevPosts => {
        const newPosts = prevPosts.filter(post => post.id !== id);
        console.log('Deleting post, new state:', newPosts); // Debug log
        return newPosts;
      });
      setError(null);
    } catch (err) {
      setError('Failed to delete post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <PostContext.Provider 
      value={{ 
        posts, 
        loading, 
        error,
        addPost, 
        updatePost, 
        deletePost,
        clearError
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext); 