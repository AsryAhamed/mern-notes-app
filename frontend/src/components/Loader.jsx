const Loader = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const loader = (
    <div className={`${sizes[size]} border-4 border-gray-300 dark:border-gray-600 border-t-primary-600 rounded-full animate-spin`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;