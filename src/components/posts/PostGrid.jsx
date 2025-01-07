import { useState } from 'react';
import { usePosts } from '../../context/PostContext';
import { useToast } from '../../context/ToastContext';
import PostCard from './PostCard';
import PostForm from './PostForm';
import ExpandedPost from './ExpandedPost';
import Modal from '../ui/Modal';
import { FiAlertTriangle, FiLoader } from 'react-icons/fi';

function PostGrid() {
  const { posts, loading, error, addPost, updatePost, deletePost, clearError } = usePosts();
  const { addToast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);

  const handleSubmit = async (postData) => {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData);
        addToast({
          message: 'Post updated successfully!',
          variant: 'success'
        });
      } else {
        await addPost(postData);
        addToast({
          message: 'Post created successfully!',
          variant: 'success'
        });
      }
      setIsFormOpen(false);
      setEditingPost(null);
    } catch (err) {
      console.error('Failed to save post:', err);
      addToast({
        message: 'Failed to save post. Please try again.',
        variant: 'error'
      });
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = async (postId) => {
    setDeletingPost(posts.find(p => p.id === postId));
  };

  const confirmDelete = async () => {
    try {
      await deletePost(deletingPost.id);
      addToast({
        message: 'Post deleted successfully!',
        variant: 'success'
      });
      // Close expanded view if the deleted post was expanded
      if (expandedPost?.id === deletingPost.id) {
        setExpandedPost(null);
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
      addToast({
        message: 'Failed to delete post. Please try again.',
        variant: 'error'
      });
    } finally {
      setDeletingPost(null);
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 rounded-lg flex items-center text-red-800 dark:text-red-100">
          <FiAlertTriangle className="w-5 h-5 mr-2" />
          <span>{error}</span>
          <button
            onClick={clearError}
            className="ml-auto text-sm hover:text-red-900 dark:hover:text-red-200"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Create Post Button */}
      <div className="mb-8 flex justify-end">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-all duration-300"
          disabled={loading}
        >
          Create Post
        </button>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-lg shadow-sm">
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            No posts yet. Create your first post!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onExpand={setExpandedPost}
            />
          ))}
        </div>
      )}

      {/* Post Form Modal */}
      {isFormOpen && (
        <PostForm
          post={editingPost}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingPost(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingPost}
        onClose={() => setDeletingPost(null)}
        title="Delete Post"
        actions={
          <>
            <button
              onClick={() => setDeletingPost(null)}
              className="px-4 py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-light-text dark:text-dark-text">
          Are you sure you want to delete "{deletingPost?.title}"? This action cannot be undone.
        </p>
      </Modal>

      {/* Expanded Post View */}
      {expandedPost && (
        <ExpandedPost
          post={expandedPost}
          onClose={() => setExpandedPost(null)}
        />
      )}
    </div>
  );
}

export default PostGrid; 