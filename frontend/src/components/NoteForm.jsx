import { useState, useEffect } from 'react';
import { X, Save, Pin, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const NoteForm = ({ note, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    pinned: false,
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        pinned: note.pinned || false,
        tags: note.tags || [],
      });
    }
  }, [note]);

  // Save shortcut (Cmd/Ctrl + S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSave(formData);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Note title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input text-xl font-semibold"
          autoFocus
          required
        />
      </div>

      {/* Content Textarea */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          placeholder="Write your note here..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="input min-h-[300px] resize-none"
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            id="tags"
            type="text"
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTag(e);
              }
            }}
            className="input flex-1"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="btn btn-secondary"
            disabled={!tagInput.trim()}
          >
            <Tag className="w-4 h-4" />
          </button>
        </div>
        
        {/* Tag List */}
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-primary-900 dark:hover:text-primary-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pin Toggle */}
      <div className="flex items-center gap-2">
        <input
          id="pinned"
          type="checkbox"
          checked={formData.pinned}
          onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="pinned" className="text-sm font-medium flex items-center gap-2">
          <Pin className="w-4 h-4" />
          Pin this note
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1 flex items-center justify-center gap-2">
          <Save className="w-4 h-4" />
          Save Note (⌘S)
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </motion.form>
  );
};

export default NoteForm;