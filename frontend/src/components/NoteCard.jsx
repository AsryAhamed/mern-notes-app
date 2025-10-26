import { motion } from 'framer-motion';
import { Pin, Archive, Trash2, Edit, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const NoteCard = ({ note, onEdit, onDelete, onPin, onArchive }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="card p-5 cursor-pointer group relative"
      onClick={() => onEdit(note)}
    >
      {/* Pin Badge */}
      {note.pinned && (
        <div className="absolute top-3 right-3">
          <Pin className="w-4 h-4 text-primary-600 fill-primary-600" />
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold line-clamp-2 pr-8">
          {note.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {note.content}
        </p>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-md"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500">
            {formatDate(note.updatedAt || note.createdAt)}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPin(note);
              }}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
            >
              <Pin className={`w-4 h-4 ${note.pinned ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onArchive(note);
              }}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={note.archived ? 'Unarchive note' : 'Archive note'}
            >
              <Archive className="w-4 h-4" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note);
              }}
              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
              aria-label="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;