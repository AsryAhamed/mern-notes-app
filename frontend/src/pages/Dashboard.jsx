import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Inbox } from 'lucide-react';
import axios from '../utils/axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import { useUI } from '../context/UIContext';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const { showToast } = useUI();

  // Fetch notes
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/notes');
      setNotes(data);
      
      // Extract unique tags
      const tags = [...new Set(data.flatMap(note => note.tags || []))];
      setAllTags(tags);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to fetch notes', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Filter notes based on active filter and search
  useEffect(() => {
    let filtered = [...notes];

    // Apply filter
    if (activeFilter === 'pinned') {
      filtered = filtered.filter(note => note.pinned && !note.archived);
    } else if (activeFilter === 'archived') {
      filtered = filtered.filter(note => note.archived);
    } else if (activeFilter === 'all') {
      filtered = filtered.filter(note => !note.archived);
    } else if (activeFilter.startsWith('tag:')) {
      const tag = activeFilter.replace('tag:', '');
      filtered = filtered.filter(note => note.tags?.includes(tag));
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        note =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    // Sort: pinned first, then by date
    filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredNotes(filtered);
  }, [notes, activeFilter, searchQuery]);

  // Handle search with debounce
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Handle filter change
  const handleFilterChange = (filter, tag = null) => {
    if (tag) {
      setActiveFilter(`tag:${tag}`);
    } else {
      setActiveFilter(filter);
    }
  };

  // Handle new note
  const handleNewNote = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  // Handle edit note
  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  // Handle save note
  const handleSaveNote = async (formData) => {
    try {
      if (selectedNote) {
        // Update existing note
        const { data } = await axios.put(`/notes/${selectedNote._id}`, formData);
        setNotes(notes.map(n => (n._id === data._id ? data : n)));
        showToast('Note updated successfully', 'success');
      } else {
        // Create new note
        const { data } = await axios.post('/notes', formData);
        setNotes([data, ...notes]);
        showToast('Note created successfully', 'success');
      }
      setIsModalOpen(false);
      setSelectedNote(null);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to save note', 'error');
    }
  };

  // Handle delete note
  const handleDeleteNote = async (note) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await axios.delete(`/notes/${note._id}`);
      setNotes(notes.filter(n => n._id !== note._id));
      showToast('Note deleted successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to delete note', 'error');
    }
  };

  // Handle pin/unpin note
  const handlePinNote = async (note) => {
    try {
      const { data } = await axios.put(`/notes/${note._id}`, {
        pinned: !note.pinned,
      });
      setNotes(notes.map(n => (n._id === data._id ? data : n)));
      showToast(`Note ${data.pinned ? 'pinned' : 'unpinned'}`, 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update note', 'error');
    }
  };

  // Handle archive/unarchive note
  const handleArchiveNote = async (note) => {
    try {
      const { data } = await axios.put(`/notes/${note._id}`, {
        archived: !note.archived,
      });
      setNotes(notes.map(n => (n._id === data._id ? data : n)));
      showToast(`Note ${data.archived ? 'archived' : 'unarchived'}`, 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update note', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} onNewNote={handleNewNote} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          tags={allTags}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold">
                {activeFilter === 'all' && 'All Notes'}
                {activeFilter === 'pinned' && 'Pinned Notes'}
                {activeFilter === 'archived' && 'Archived Notes'}
                {activeFilter.startsWith('tag:') && `#${activeFilter.replace('tag:', '')}`}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader size="lg" />
              </div>
            ) : filteredNotes.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  {searchQuery ? (
                    <Inbox className="w-12 h-12 text-gray-400" />
                  ) : (
                    <FileText className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {searchQuery ? 'No notes found' : 'No notes yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  {searchQuery
                    ? 'Try adjusting your search or filters'
                    : 'Create your first note to get started organizing your thoughts'}
                </p>
                {!searchQuery && (
                  <button onClick={handleNewNote} className="btn btn-primary">
                    Create Your First Note
                  </button>
                )}
              </motion.div>
            ) : (
              /* Notes Grid */
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredNotes.map(note => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      onPin={handlePinNote}
                      onArchive={handleArchiveNote}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Note Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        title={selectedNote ? 'Edit Note' : 'New Note'}
        size="lg"
      >
        <NoteForm
          note={selectedNote}
          onSave={handleSaveNote}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedNote(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;