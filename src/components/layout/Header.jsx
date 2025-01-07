import ThemeToggle from '../ui/ThemeToggle';

function Header() {
  return (
    <header className="bg-light-card dark:bg-dark-card shadow transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-primary uppercase font-bold">BLOG</span>
            <h1 className="text-3xl font-bold mt-2 text-light-text dark:text-dark-text">
              Our Latest Blog Post
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
              Welcome to this amazing blog where you can read about the latest news and updates in the world of AI and technology.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
              VIEW ALL BLOG
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 