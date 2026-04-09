"use client";
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, LayoutDashboard } from 'lucide-react';

export default function AdminInsight() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', category: 'AI 뉴스', content: '', image_url: '', file_url: '' });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert('저장되었습니다.');
      setFormData({ title: '', category: 'AI 뉴스', content: '', image_url: '', file_url: '' });
      fetchPosts();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 flex items-center">
        <LayoutDashboard className="mr-3" /> AI 인사이트 관리
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Write Form */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-fit sticky top-8">
          <h2 className="text-xl font-bold mb-6 flex items-center"><Plus className="mr-2 h-5 w-5" /> 새 글 작성</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required className="w-full px-4 py-3 bg-slate-50 border rounded-xl" placeholder="제목" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <select className="w-full px-4 py-3 bg-slate-50 border rounded-xl" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option>AI 뉴스</option><option>AI 기술</option><option>생성형 AI</option><option>교육 정보</option>
            </select>
            <textarea required rows={8} className="w-full px-4 py-3 bg-slate-50 border rounded-xl" placeholder="내용" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
            <input className="w-full px-4 py-3 bg-slate-50 border rounded-xl" placeholder="이미지 URL" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
            <input className="w-full px-4 py-3 bg-slate-50 border rounded-xl" placeholder="파일 다운로드 링크" value={formData.file_url} onChange={e => setFormData({...formData, file_url: e.target.value})} />
            <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center space-x-2">
              <Save className="h-5 w-5" /> <span>글 올리기</span>
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-6">게시글 목록 ({posts.length})</h2>
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white p-6 rounded-2xl border flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-primary bg-primary-50 px-2 py-1 rounded mr-3">{post.category}</span>
                <span className="font-bold text-slate-800">{post.title}</span>
                <p className="text-xs text-slate-400 mt-1">{new Date(post.created_at).toLocaleString()}</p>
              </div>
              <button className="text-slate-300 hover:text-red-500 p-2"><Trash2 className="h-5 w-5" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
