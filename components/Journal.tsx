import React, { useState, useEffect } from 'react';

interface MarkdownFile {
  id: string;
  title: string;
  category: 'article' | 'insight';
  content: string;
  date: string;
}

const Journal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'article' | 'insight'>('article');
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [newFile, setNewFile] = useState({ title: '', content: '', category: 'article' as 'article' | 'insight' });

  // Load files from localStorage on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('journalFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  // Save files to localStorage
  const saveFiles = (updatedFiles: MarkdownFile[]) => {
    setFiles(updatedFiles);
    localStorage.setItem('journalFiles', JSON.stringify(updatedFiles));
  };

  const handleCreateFile = () => {
    if (!newFile.title.trim()) return;
    
    const file: MarkdownFile = {
      id: Date.now().toString(),
      title: newFile.title,
      content: newFile.content,
      category: newFile.category,
      date: new Date().toISOString().split('T')[0]
    };
    
    saveFiles([...files, file]);
    setNewFile({ title: '', content: '', category: 'article' });
    setIsWriting(false);
    setSelectedFile(file);
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('이 파일을 삭제하시겠습니까?')) {
      const updatedFiles = files.filter(f => f.id !== id);
      saveFiles(updatedFiles);
      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    }
  };

  const filteredFiles = files.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 border-l border-indigo-500/30 pl-8">
          <h1 className="font-serif-display text-4xl md:text-5xl text-slate-200 mb-4">Journal</h1>
          <p className="text-slate-400 text-sm md:text-base">Articles and stock analysis insights</p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-800">
          <button
            onClick={() => {
              setActiveCategory('article');
              setSelectedFile(null);
            }}
            className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
              activeCategory === 'article'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Article
          </button>
          <button
            onClick={() => {
              setActiveCategory('insight');
              setSelectedFile(null);
            }}
            className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
              activeCategory === 'insight'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Insight
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File List */}
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={() => setIsWriting(true)}
              className="w-full px-4 py-3 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-500/30 transition-colors text-sm uppercase tracking-wider"
            >
              + New {activeCategory === 'article' ? 'Article' : 'Insight'}
            </button>

            {isWriting && (
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={newFile.title}
                  onChange={(e) => setNewFile({ ...newFile, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <select
                  value={newFile.category}
                  onChange={(e) => setNewFile({ ...newFile, category: e.target.value as 'article' | 'insight' })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="article">Article</option>
                  <option value="insight">Insight</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateFile}
                    className="flex-1 px-3 py-2 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600 transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsWriting(false);
                      setNewFile({ title: '', content: '', category: 'article' });
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700 text-white rounded text-sm hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredFiles.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">No files yet. Create your first {activeCategory}!</p>
              ) : (
                filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedFile?.id === file.id
                        ? 'bg-indigo-500/10 border-indigo-500/30'
                        : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <h3 className="text-white font-medium mb-1 text-sm">{file.title}</h3>
                    <p className="text-slate-500 text-xs">{file.date}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(file.id);
                      }}
                      className="mt-2 text-red-400 hover:text-red-300 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* File Content Editor/Viewer */}
          <div className="lg:col-span-2">
            {selectedFile ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 min-h-[500px]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-serif-display text-white mb-2">{selectedFile.title}</h2>
                    <p className="text-slate-500 text-sm">{selectedFile.date}</p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    Close
                  </button>
                </div>
                <textarea
                  value={selectedFile.content}
                  onChange={(e) => {
                    const updated = { ...selectedFile, content: e.target.value };
                    setSelectedFile(updated);
                    const updatedFiles = files.map(f => f.id === updated.id ? updated : f);
                    saveFiles(updatedFiles);
                  }}
                  placeholder="Write your markdown content here..."
                  className="w-full h-[400px] px-4 py-3 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono resize-none"
                />
                <div className="mt-4 p-4 bg-slate-800 rounded border border-slate-700">
                  <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-2">Preview</h3>
                  <div 
                    className="prose prose-invert prose-sm max-w-none text-slate-300"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedFile.content
                        .replace(/\n/g, '<br>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code class="bg-slate-700 px-1 rounded">$1</code>')
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-12 text-center min-h-[500px] flex items-center justify-center">
                <div>
                  <p className="text-slate-500 text-lg mb-2">Select a file to view or edit</p>
                  <p className="text-slate-600 text-sm">Or create a new {activeCategory} to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
