import { motion } from 'framer-motion';
import { Archive, Pin, Tag, Trash2 } from 'lucide-react';

const Sidebar = ({ activeFilter, onFilterChange, tags = [] }) => {
  const filters = [
    { id: 'all', label: 'All Notes', icon: null },
    { id: 'pinned', label: 'Pinned', icon: Pin },
    { id: 'archived', label: 'Archived', icon: Archive },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 space-y-6">
      {/* Filters */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Filters
        </h3>
        <div className="space-y-1">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            
            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="text-sm">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Tags
          </h3>
          <div className="space-y-1">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onFilterChange('tag', tag)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-left"
              >
                <Tag className="w-4 h-4" />
                <span className="text-sm truncate">#{tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;