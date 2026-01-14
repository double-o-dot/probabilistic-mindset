import React, { useState, useEffect } from 'react';

interface IdeaFile {
  id: string;
  title: string;
  content: string;
  date: string;
}

const Idea: React.FC = () => {
  const [files, setFiles] = useState<IdeaFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<IdeaFile | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [newFile, setNewFile] = useState({ title: '', content: '' });

  // Load files from localStorage on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('ideaFiles');
    if (savedFiles) {
      const parsed = JSON.parse(savedFiles);
      setFiles(parsed);
      // Auto-select first file if available
      if (parsed.length > 0 && !selectedFile) {
        setSelectedFile(parsed[0]);
      }
    }
  }, []);

  // Save files to localStorage
  const saveFiles = (updatedFiles: IdeaFile[]) => {
    setFiles(updatedFiles);
    localStorage.setItem('ideaFiles', JSON.stringify(updatedFiles));
  };

  const handleCreateFile = () => {
    if (!newFile.title.trim()) return;
    
    const file: IdeaFile = {
      id: Date.now().toString(),
      title: newFile.title,
      content: newFile.content,
      date: new Date().toISOString().split('T')[0]
    };
    
    saveFiles([...files, file]);
    setNewFile({ title: '', content: '' });
    setIsWriting(false);
    setSelectedFile(file);
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('이 아이디어를 삭제하시겠습니까?')) {
      const updatedFiles = files.filter(f => f.id !== id);
      saveFiles(updatedFiles);
      if (selectedFile?.id === id) {
        setSelectedFile(updatedFiles.length > 0 ? updatedFiles[0] : null);
      }
    }
  };

  // Sort files by date (newest first)
  const sortedFiles = [...files].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 border-l border-indigo-500/30 pl-8">
          <h1 className="font-serif-display text-4xl md:text-5xl text-slate-200 mb-4">Idea</h1>
          <p className="text-slate-400 text-sm md:text-base">Thoughts and insights in markdown format</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Post List */}
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={() => setIsWriting(true)}
              className="w-full px-4 py-3 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-500/30 transition-colors text-sm uppercase tracking-wider"
            >
              + New Idea
            </button>

            {isWriting && (
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-3">
                <input
                  type="text"
                  placeholder="Idea Title"
                  value={newFile.title}
                  onChange={(e) => setNewFile({ ...newFile, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
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
                      setNewFile({ title: '', content: '' });
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700 text-white rounded text-sm hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {sortedFiles.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">No ideas yet. Create your first one!</p>
              ) : (
                sortedFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedFile?.id === file.id
                        ? 'bg-indigo-500/10 border-indigo-500/30'
                        : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <h3 className="text-white font-medium mb-2 text-sm leading-tight">{file.title}</h3>
                    <p className="text-slate-500 text-xs mb-2">{file.date}</p>
                    {file.content && (
                      <p className="text-slate-600 text-xs line-clamp-2 mb-2">
                        {file.content.substring(0, 100)}...
                      </p>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(file.id);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Blog Post Content */}
          <div className="lg:col-span-2">
            {selectedFile ? (
              <article className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 min-h-[500px]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-serif-display text-white mb-3">{selectedFile.title}</h2>
                    <p className="text-slate-500 text-sm">{selectedFile.date}</p>
                  </div>
                  <button
                    onClick={() => {
                      const updatedFiles = files.map(f => f.id === selectedFile.id ? selectedFile : f);
                      saveFiles(updatedFiles);
                    }}
                    className="text-indigo-400 hover:text-indigo-300 text-sm"
                  >
                    Save
                  </button>
                </div>
                
                <textarea
                  value={selectedFile.content}
                  onChange={(e) => {
                    setSelectedFile({ ...selectedFile, content: e.target.value });
                  }}
                  onPaste={async (e) => {
                    const items = e.clipboardData.items;
                    for (let i = 0; i < items.length; i++) {
                      const item = items[i];
                      if (item.type.indexOf('image') !== -1) {
                        e.preventDefault();
                        const file = item.getAsFile();
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const base64 = event.target?.result as string;
                            const imageMarkdown = `\n![Pasted Image](${base64})\n`;
                            const textarea = e.currentTarget;
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const newContent = 
                              selectedFile.content.substring(0, start) + 
                              imageMarkdown + 
                              selectedFile.content.substring(end);
                            setSelectedFile({ ...selectedFile, content: newContent });
                            // Set cursor position after inserted image
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
                            }, 0);
                          };
                          reader.readAsDataURL(file);
                        }
                        break;
                      }
                    }
                  }}
                  placeholder="Write your idea in markdown format... (You can paste images directly)"
                  className="w-full h-[400px] px-4 py-3 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono resize-none mb-6"
                />
                
                <div className="p-6 bg-slate-800 rounded border border-slate-700">
                  <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-4">Preview</h3>
                  <div 
                    className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedFile.content
                        .replace(/\n\n/g, '</p><p>')
                        .replace(/^/, '<p>')
                        .replace(/$/, '</p>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code class="bg-slate-700 px-1.5 py-0.5 rounded text-indigo-300">$1</code>')
                        .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-white mt-6 mb-4">$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-white mt-5 mb-3">$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
                        .replace(/!\[([^\]]*)\]\((data:image\/[^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded my-4" />')
                        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded my-4" />')
                    }}
                  />
                </div>
              </article>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-12 text-center min-h-[500px] flex items-center justify-center">
                <div>
                  <p className="text-slate-500 text-lg mb-2">Select an idea to read or edit</p>
                  <p className="text-slate-600 text-sm">Or create a new idea to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;
