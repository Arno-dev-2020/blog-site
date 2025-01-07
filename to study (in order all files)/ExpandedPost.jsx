import { FiX } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';

function ExpandedPost({ post, onClose }) {
  const [imageHeight, setImageHeight] = useState(40);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);
  const scrollStartThreshold = 50;
  const scrollEndThreshold = 200;

  useEffect(() => {
    // Set up custom highlight color
    if (contentRef.current) {
      contentRef.current.style.setProperty(
        '--highlight-color',
        post.highlightColor || '#FFD700'
      );
    }

    // Trigger entrance animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => setIsVisible(false);
  }, [post.highlightColor]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollPosition = contentRef.current.scrollTop;
      
      if (scrollPosition <= scrollStartThreshold) {
        setImageHeight(40);
      } else if (scrollPosition >= scrollEndThreshold) {
        setImageHeight(20);
      } else {
        const scrollProgress = (scrollPosition - scrollStartThreshold) / 
                             (scrollEndThreshold - scrollStartThreshold);
        const newHeight = 40 - (scrollProgress * 20);
        setImageHeight(newHeight);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed inset-x-0 top-0 bottom-0 z-50 flex items-start justify-center pt-32
                    transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm
                   transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div className={`relative w-[95%] max-w-7xl bg-light-card dark:bg-dark-card 
                    rounded-xl shadow-2xl overflow-hidden flex flex-col
                    max-h-[calc(100vh-150px)]
                    transition-all duration-300 transform
                    ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'}`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/90 dark:bg-dark-card/90 
                   rounded-full shadow-lg hover:bg-white dark:hover:bg-dark-card
                   transition-all duration-200 group"
          aria-label="Close expanded view"
        >
          <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300 
                       group-hover:text-gray-900 dark:group-hover:text-white
                       transition-colors duration-200" />
        </button>

        {/* Image Section - Fixed */}
        <div 
          style={{ height: `${imageHeight}vh` }}
          className="relative bg-gray-100 dark:bg-gray-800 flex-shrink-0
                   transition-all duration-300 ease-in-out"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-6 left-6 bg-white/90 dark:bg-primary/90 
                       px-4 py-2 rounded-full text-sm font-medium shadow-lg
                       text-gray-800 dark:text-white border border-transparent
                       dark:border-primary/20">
            {post.category}
          </span>
        </div>

        {/* Content Section - Scrollable */}
        <div 
          ref={contentRef}
          className={`flex-1 overflow-y-auto transition-opacity duration-300 delay-150
                   highlight-container
                   ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            '--highlight-color': post.highlightColor || '#FFD700'
          }}
        >
          <div className="max-w-4xl mx-auto px-8 py-10">
            <h2 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">
              {post.title}
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary 
                       text-lg leading-relaxed whitespace-pre-wrap selection:bg-[var(--highlight-color)]
                       selection:bg-opacity-40">
              {post.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedPost; 