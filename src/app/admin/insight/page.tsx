"use client";
import { useState, useEffect } from "react";
import { Save, Plus, Trash2, LayoutDashboard, ArrowLeft, Newspaper, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AdminInsight() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "AI 뉴스",
    content: "",
    image_url: "",
    file_url: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("성공적으로 게시되었습니다.");
      setFormData({
        title: "",
        category: "AI 뉴스",
        content: "",
        image_url: "",
        file_url: "",
      });
      fetchPosts();
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`'${title}' 글을 정말 삭제하시겠습니까?`)) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("삭제되었습니다.");
        fetchPosts();
      } else {
        alert("삭제 실패했습니다.");
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-3">
          <Newspaper className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-slate-900">AI 인사이트 관리</h1>
        </div>
        <Link
          href="/admin"
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>대시보드로 돌아가기</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-fit sticky top-8">
          <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800">
            <Plus className="mr-2 h-5 w-5 text-primary" /> 새 인사이트 작성
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1">제목</label>
              <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="글 제목" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1">카테고리</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option>AI 뉴스</option><option>AI 기술</option><option>생성형 AI</option><option>교육 정보</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1">본문 내용</label>
              <textarea required rows={8} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="내용 작성" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1">메인 이미지 (URL)</label>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl" placeholder="https://이미지주소.jpg" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
              <p className="text-[10px] text-slate-400 mt-1">* 외부 이미지 링크를 복사해서 넣어주세요.</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1">파일 링크 (옵션)</label>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl" placeholder="다운로드 링크" value={formData.file_url} onChange={e => setFormData({...formData, file_url: e.target.value})} />
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-700 shadow-lg shadow-primary/20 transition-all">
              <Save className="h-5 w-5" /> <span>인사이트 게시하기</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-6 text-slate-800">게시된 인사이트 목록 ({posts.length})</h2>
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center hover:border-primary/30 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-50">
                  {post.image_url ? (
                    <img src={post.image_url} alt="thumb" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-slate-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-extrabold text-primary bg-primary-50 px-2 py-0.5 rounded uppercase tracking-tighter">{post.category}</span>
                    <h3 className="font-bold text-slate-800 line-clamp-1">{post.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400">{new Date(post.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleDelete(post.id, post.title)}
                  className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-24 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">등록된 게시글이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
