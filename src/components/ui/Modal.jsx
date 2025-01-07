import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

function Modal({ isOpen, onClose, title, children, actions }) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"
        />

        {/* Modal panel */}
        <div
          className="relative transform overflow-hidden rounded-lg bg-light-card dark:bg-dark-card transition-colors duration-300 w-full max-w-lg p-6 text-left shadow-xl transition-all"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Title */}
          {title && (
            <h3
              className="text-lg font-medium leading-6 text-light-text dark:text-dark-text mb-4"
              id="modal-title"
            >
              {title}
            </h3>
          )}

          {/* Content */}
          <div className="mt-2">
            {children}
          </div>

          {/* Actions */}
          {actions && (
            <div className="mt-6 flex justify-end space-x-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal; 