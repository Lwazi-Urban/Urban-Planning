
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock,
  BookOpen,
  Lock,
  Unlock,
  Plus,
  Save,
  X,
  Image as ImageIcon,
  KeyRound,
  Edit
} from 'lucide-react';
import { BlogPost } from '../types';

// Mock Initial Data
const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Economic Impact of Zoning Relaxations',
    category: 'Urban Economics',
    author: 'NeXT Planning Team',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    content: `
      <h2 class="text-2xl font-bold mb-4">Unlocking Potential</h2>
      <p class="mb-4">Strict zoning laws often stifle micro-economic growth in suburban areas. By allowing thoughtful relaxations—such as permitting small home offices or "granny flats"—municipalities can significantly increase the value of properties and the local tax base.</p>
      <p class="mb-4">In the South Coast Region specifically, we've observed a <strong>15% increase in property valuation</strong> for lots with approved second dwelling rights.</p>
    `
  },
  {
    id: '2',
    title: 'Understanding the 2024 Spatial Development Framework',
    category: 'Legislation',
    author: 'Lwazi Khwela',
    date: 'Nov 05, 2023',
    readTime: '8 min read',
    content: `
      <h2 class="text-2xl font-bold mb-4">A Shift Towards Densification</h2>
      <p class="mb-4">The new SDF prioritizes vertical growth over urban sprawl. This means applications for higher Floor Area Ratios (FAR) in corridor zones like Port Shepstone CBD are being fast-tracked.</p>
      <p class="mb-4"><mark class="bg-yellow-200">Key Takeaway: If you own property along the R102 corridor, your development rights may have automatically increased.</mark></p>
    `
  }
];

const KnowledgeBase: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [viewState, setViewState] = useState<'list' | 'read' | 'edit'>('list');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Auth State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);
  
  // Editor State
  const [editorState, setEditorState] = useState<Partial<BlogPost>>({
    title: '',
    category: '',
    author: 'NeXT Admin',
    heroImage: '',
    content: ''
  });

  const handleLockClick = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowAuthModal(true);
      setPinInput('');
      setAuthError(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'admin123') {
      setIsAdmin(true);
      setShowAuthModal(false);
    } else {
      setAuthError(true);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditorState({ ...post });
    setViewState('edit');
  };

  const handleNewPost = () => {
    setEditorState({
      id: undefined,
      title: '',
      category: '',
      author: 'NeXT Admin',
      heroImage: '',
      content: ''
    });
    setViewState('edit');
  };

  const handleSavePost = () => {
    if (!editorState.title || !editorState.content) return;

    if (editorState.id) {
      // Update existing post
      setPosts(posts.map(p => (p.id === editorState.id ? { ...p, ...editorState } as BlogPost : p)));
      
      // If we were reading this post, update the active view too
      if (activePost && activePost.id === editorState.id) {
        setActivePost({ ...activePost, ...editorState } as BlogPost);
        setViewState('read');
      } else {
        setViewState('list');
      }

    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: editorState.title!,
        category: editorState.category || 'General',
        author: editorState.author || 'NeXT Admin',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '5 min read',
        heroImage: editorState.heroImage,
        content: editorState.content!
      };
      setPosts([newPost, ...posts]);
      setViewState('list');
    }
    
    // Reset editor
    setEditorState({ title: '', category: '', author: 'NeXT Admin', heroImage: '', content: '' });
  };

  return (
    <>
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
          <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 w-full max-w-sm animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400">
              <X size={20} />
            </button>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-500">
                <KeyRound size={24} />
              </div>
              <div>
                <h3 className="text-xl font-google font-bold">Admin Access</h3>
                <p className="text-sm text-gray-500">Enter PIN to manage articles.</p>
              </div>
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <input 
                  autoFocus
                  type="password" 
                  placeholder="Enter PIN" 
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold tracking-widest ${authError ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                />
                {authError && <p className="text-xs text-red-500 font-bold">Incorrect PIN</p>}
                <button type="submit" className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
                  Unlock
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 1. EDIT VIEW (Admin Only) */}
      {viewState === 'edit' && isAdmin && (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setViewState(editorState.id ? 'read' : 'list')}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 font-bold"
            >
              <ArrowLeft size={20} />
              <span>Cancel</span>
            </button>
            <h2 className="text-2xl font-google font-bold">{editorState.id ? 'Edit Article' : 'New Article'}</h2>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-200 space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Article Title</label>
              <input 
                type="text" 
                placeholder="e.g. The Future of Coastal Zoning"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-google font-bold text-lg"
                value={editorState.title}
                onChange={e => setEditorState({...editorState, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                <input 
                  type="text" 
                  placeholder="e.g. Legislation"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editorState.category}
                  onChange={e => setEditorState({...editorState, category: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Author</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editorState.author}
                  onChange={e => setEditorState({...editorState, author: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Hero Image URL (Optional)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="https://..."
                  className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={editorState.heroImage}
                  onChange={e => setEditorState({...editorState, heroImage: e.target.value})}
                />
                <div className="p-4 bg-gray-100 rounded-2xl text-gray-400">
                  <ImageIcon size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Content (HTML Supported)</label>
              <textarea 
                rows={10}
                placeholder="<p>Write your article content here...</p>"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                value={editorState.content}
                onChange={e => setEditorState({...editorState, content: e.target.value})}
              />
              <p className="text-xs text-gray-400 ml-1">Tip: Use &lt;h2&gt;, &lt;p&gt;, and &lt;strong&gt; tags for formatting.</p>
            </div>

            <button 
              onClick={handleSavePost}
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
            >
              <Save size={20} />
              <span>{editorState.id ? 'Update Article' : 'Publish Article'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. LIST VIEW */}
      {viewState === 'list' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-google font-bold text-gray-900 flex items-center gap-3 justify-center md:justify-start">
                Knowledge Base
                <button 
                  onClick={handleLockClick}
                  className={`p-1.5 rounded-full transition-all hover:bg-gray-100 active:scale-95 ${isAdmin ? 'text-green-500 bg-green-50' : 'text-gray-400'}`}
                  title={isAdmin ? "Admin Active" : "Admin Login"}
                >
                  {isAdmin ? <Unlock size={20} /> : <Lock size={20} />}
                </button>
              </h2>
              <p className="text-gray-500 mt-2">Insights, legislation updates, and development history.</p>
            </div>
            
            {isAdmin && (
              <button 
                onClick={handleNewPost}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all active:scale-95"
              >
                <Plus size={18} />
                <span>New Article</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div 
                key={post.id} 
                onClick={() => { setActivePost(post); setViewState('read'); }}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden group flex flex-col h-full relative"
              >
                {isAdmin && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditPost(post); }}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-colors"
                    title="Edit Article"
                  >
                    <Edit size={16} />
                  </button>
                )}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  {post.heroImage ? (
                    <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-silver-gradient text-gray-400">
                       <BookOpen size={48} className="opacity-20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-600">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-google font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <div className="mt-auto flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
                     <div className="flex items-center space-x-2">
                        <User size={14} />
                        <span>{post.author}</span>
                     </div>
                     <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. READ VIEW */}
      {viewState === 'read' && activePost && (
        <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setViewState('list')} 
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 font-bold transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Articles</span>
            </button>
            
            {isAdmin && (
              <button 
                onClick={() => handleEditPost(activePost)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Edit size={16} />
                <span>Edit Article</span>
              </button>
            )}
          </div>

          <article className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="text-center space-y-6 mb-12 border-b border-gray-100 pb-12">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
                {activePost.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-google font-bold text-gray-900 leading-tight">
                {activePost.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-gray-500 text-sm">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{activePost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{activePost.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{activePost.readTime}</span>
                </div>
              </div>
            </div>

            <div 
              className="prose prose-lg prose-blue max-w-none text-gray-700 font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activePost.content }} 
            />
          </article>
        </div>
      )}
    </>
  );
};

export default KnowledgeBase;
