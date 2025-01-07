import { PostProvider } from './context/PostContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/layout/Header';
import PostGrid from './components/posts/PostGrid';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <PostProvider>
            <div className="min-h-screen transition-colors duration-300 bg-light-bg dark:bg-dark-bg">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <PostGrid />
              </main>
            </div>
          </PostProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 