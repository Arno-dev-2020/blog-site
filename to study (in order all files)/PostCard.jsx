import { FiEdit, FiTrash2 } from 'react-icons/fi';

function PostCard({ post, onEdit, onDelete, onExpand }) {
  const handleClick = (e) => {
    // Don't expand if clicking on action buttons
    if (e.target.closest('.post-actions')) {
      return;
    }
    onExpand(post);
  };

  return (
    <div
      className="bg-light-card dark:bg-dark-card rounded-lg overflow-hidden shadow-md 
                 transition-all duration-300 hover:shadow-lg cursor-pointer
                 transform hover:scale-[1.02]"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {/* Category Tag */}
        <span className="absolute top-4 left-4 bg-white/90 dark:bg-primary/90 
                     px-4 py-2 rounded-full text-sm font-medium shadow-lg
                     text-gray-800 dark:text-white border border-transparent
                     dark:border-primary/20">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">
          {post.title}
        </h3>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
          {post.content}
        </p>
        
        {/* Actions */}
        <div className="flex justify-end space-x-2 post-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post);
            }}
            className="p-2 text-light-text-secondary dark:text-dark-text-secondary 
                     hover:text-light-text dark:hover:text-dark-text
                     transition-colors duration-200"
            aria-label="Edit post"
          >
            <FiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post.id);
            }}
            className="p-2 text-light-text-secondary dark:text-dark-text-secondary 
                     hover:text-red-500 dark:hover:text-red-400
                     transition-colors duration-200"
            aria-label="Delete post"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard; 