import { useState, useEffect } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import { HexColorPicker } from 'react-colorful';

function PostForm({ post, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: 'DESIGN',
    highlightColor: '#FFD700' // Default gold color
  });
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['DEVELOPMENT', 'DESIGN', 'UI/UX']);
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
    // Load custom categories from localStorage
    const savedCategories = localStorage.getItem('customCategories');
    if (savedCategories) {
      setCategories(prev => [...new Set([...prev, ...JSON.parse(savedCategories)])]);
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      highlightColor: color
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }
    onSubmit(formData);
  };

  const handleCreateCategory = () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    const formattedCategory = newCategory.toUpperCase().trim();
    
    if (categories.includes(formattedCategory)) {
      setError('This category already exists');
      return;
    }

    // Update categories list
    setCategories(prev => [...prev, formattedCategory]);
    
    // Save to localStorage
    const savedCategories = JSON.parse(localStorage.getItem('customCategories') || '[]');
    localStorage.setItem('customCategories', JSON.stringify([...savedCategories, formattedCategory]));
    
    // Set the new category as selected
    setFormData(prev => ({ ...prev, category: formattedCategory }));
    
    // Reset new category state
    setNewCategory('');
    setShowNewCategory(false);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {post ? 'Edit Post' : 'Create Post'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <FiX className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/50 p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={50}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-dark-card text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Enter post title"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formData.title.length}/50 characters
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-dark-card text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Write your post content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-dark-card text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            {showNewCategory ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-dark-card text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Enter new category name"
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark 
                           transition-colors flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCategory(false);
                    setNewCategory('');
                    setError('');
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                           rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-dark-card text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowNewCategory(true)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                           rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
                           flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  New Category
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Highlight Color
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 
                         shadow-sm transition-transform hover:scale-105"
                style={{ backgroundColor: formData.highlightColor }}
                aria-label="Choose highlight color"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Click to choose highlight color for text selection
              </span>
            </div>
            
            {showColorPicker && (
              <div className="fixed transform -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2
                           z-[60] bg-white dark:bg-dark-card rounded-lg shadow-xl p-3 
                           border border-gray-200 dark:border-gray-700">
                <div className="flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(false)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 
                             dark:hover:text-white px-2 py-1 rounded-md hover:bg-gray-100
                             dark:hover:bg-gray-800"
                  >
                    Done
                  </button>
                </div>
                <HexColorPicker
                  color={formData.highlightColor}
                  onChange={handleColorChange}
                  className="!w-[200px] !h-[200px]"
                />
                <div className="flex justify-between items-center mt-3">
                  <input
                    type="text"
                    value={formData.highlightColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 
                             rounded bg-white dark:bg-dark-card text-gray-900 dark:text-white
                             w-24"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                       rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark 
                       transition-colors"
            >
              {post ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm; 