import { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

const VARIANTS = {
  success: {
    icon: FiCheckCircle,
    className: 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100',
  },
  error: {
    icon: FiAlertCircle,
    className: 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100',
  },
};

function Toast({ message, variant = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = VARIANTS[variant].icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        flex items-center p-4 rounded-lg shadow-lg
        transform transition-all duration-300
        ${VARIANTS[variant].className}
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
      `}
      role="alert"
    >
      <Icon className="w-5 h-5 mr-3" />
      <p className="font-medium">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-6 hover:opacity-80"
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Toast;

// Toast manager component
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
} 